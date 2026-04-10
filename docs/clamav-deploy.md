# ClamAV Document Scanning — Deployment Runbook

End-to-end runbook for wiring virus scanning on user-uploaded documents. Execute these steps in order. Each step is independent and can be re-run safely.

## Overview

Three moving pieces:

1. **Supabase migration** creates the `documents` table + `document_scan_status` enum + RLS policies
2. **Railway sidecar** runs ClamAV and exposes `POST /scan`
3. **Supabase Edge Function** receives storage webhook events, downloads files, calls the Railway sidecar, updates the row

## Prerequisites

- Supabase CLI installed and linked to the Benefind project: `supabase link --project-ref <ref>`
- Railway CLI installed and logged in: `railway login`
- GitHub access to this repo
- One generated auth token: `openssl rand -hex 32 > /tmp/clamav-token.txt`

## Step 1 — Apply the Supabase migration

The migration lives at `supabase/migrations/20260410_0001_documents_table.sql`.

```bash
cd benefind
supabase db push
```

**Verify:**

```sql
-- via Supabase SQL editor
select table_name from information_schema.tables
where table_schema = 'public' and table_name = 'documents';
-- → should return 1 row

select typname from pg_type where typname = 'document_scan_status';
-- → should return 1 row

select policyname from pg_policies
where schemaname = 'public' and tablename = 'documents';
-- → should return 4 policies
```

## Step 2 — Create the Storage bucket

In the Supabase Dashboard:

1. Storage → Create new bucket
2. Name: **`user-documents`**
3. Public: **off**
4. File size limit: **25 MB**
5. Allowed MIME types (copy/paste):
   ```
   application/pdf,image/png,image/jpeg,image/gif,image/webp,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.ms-excel
   ```

Set the bucket RLS policies (Storage → Policies → user-documents):

```sql
-- Members can read objects in their own workspace's path
create policy "member_read_own_storage"
  on storage.objects for select
  using (
    bucket_id = 'user-documents'
    and exists (
      select 1 from public.documents d
      where d.storage_bucket = 'user-documents'
        and d.storage_path = storage.objects.name
        and public.is_workspace_member(d.workspace_id)
        and d.scan_status = 'clean'
        and d.deleted_at is null
    )
  );

-- Authenticated users can insert (the documents row RLS enforces
-- workspace membership)
create policy "authenticated_insert_storage"
  on storage.objects for insert
  with check (
    bucket_id = 'user-documents'
    and auth.uid() is not null
  );

-- Service role (used by the Edge Function) bypasses RLS by default
-- via its key; no explicit service_role policy needed.
```

## Step 3 — Deploy the Railway ClamAV service

```bash
cd docker/clamav-service
# See README.md in this directory for full instructions
```

**TL;DR:**

1. Create a new Railway service named `benefind-clamav`
2. Root directory: `docker/clamav-service`
3. Environment variables:
   ```
   CLAMAV_SERVICE_TOKEN=<contents of /tmp/clamav-token.txt>
   PORT=8080
   ```
4. Health check path: `/health`
5. Memory: 2 GB (clamd needs headroom for signature loading)
6. Deploy and wait for the health check to go green (30-60s on first deploy)

**Verify:**

```bash
RAILWAY_URL=$(railway domain --service benefind-clamav)
curl -s "$RAILWAY_URL/health"
# → {"status":"ok","clamd":"responding"}

# Scan the EICAR test file (harmless antivirus test string)
printf 'X5O!P%%@AP[4\PZX54(P^^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*' > /tmp/eicar.txt
curl -X POST "$RAILWAY_URL/scan" \
  -H "Authorization: Bearer $(cat /tmp/clamav-token.txt)" \
  -F "file=@/tmp/eicar.txt"
# → {"status":"infected","threats":["Win.Test.EICAR_HDB-1"],...}
```

## Step 4 — Deploy the Supabase Edge Function

```bash
cd benefind
supabase secrets set CLAMAV_SERVICE_URL=https://benefind-clamav.up.railway.app
supabase secrets set CLAMAV_SERVICE_TOKEN=$(cat /tmp/clamav-token.txt)

supabase functions deploy scan-document --no-verify-jwt
```

The `--no-verify-jwt` flag is required because the function is called by Supabase's internal webhook system, not by authenticated users. The bearer token auth (CLAMAV_SERVICE_TOKEN) is what protects the Railway side; the Edge Function is triggered only by Supabase itself.

**Verify:**

```bash
supabase functions list
# → scan-document should be listed as deployed

# Manual invocation test (simulating a storage webhook payload)
curl -X POST "https://<your-project>.supabase.co/functions/v1/scan-document" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "INSERT",
    "table": "objects",
    "schema": "storage",
    "record": {
      "bucket_id": "user-documents",
      "name": "test/nonexistent.pdf",
      "owner": null
    }
  }'
# → {"warning":"no_document_row_found"} (expected — no row yet)
```

## Step 5 — Configure the Storage webhook

In the Supabase Dashboard:

1. Database → Webhooks → Create a new hook
2. Name: **`scan-document-trigger`**
3. Table: **`storage.objects`**
4. Events: **Insert** (only)
5. Type: **Supabase Edge Functions**
6. Edge Function: **`scan-document`**
7. HTTP Method: **POST**

The webhook fires on every storage insert. The Edge Function filters to `bucket_id === 'user-documents'` internally, so irrelevant events return a 200 with `skipped: true` and never touch the database.

## Step 6 — End-to-end test

1. **Upload a clean file** through the Benefind dashboard (once the documents UI is built):
   - Expected: `documents` row created with `scan_status='pending'`, then updated to `clean` within ~5 seconds.
2. **Upload the EICAR test file:**
   - Expected: Row created, then `scan_status='infected'`, `deleted_at` set, storage object removed, notification inserted for the user.
3. **Check admin_actions:**
   ```sql
   select * from admin_actions
   where action = 'quarantine_infected_upload'
   order by created_at desc limit 5;
   ```
4. **Check the user's notification inbox:**
   ```sql
   select * from notifications
   where type = 'document_infected'
   order by created_at desc limit 5;
   ```

## Operational monitoring

### Alerts to set up in Sentry / Datadog / Railway

- **Scan latency > 30s** for any file → Railway service overload or network issue
- **`pending` rows older than 10 minutes** → Edge Function stopped processing or webhook misconfigured
- **`error` rate > 1%** over 1 hour → ClamAV service degraded
- **ClamAV health check failing** for >2 minutes → container restart needed

### Quick admin queries

```sql
-- Scan queue depth (how many files are currently being scanned)
select count(*) from documents
where scan_status = 'pending'
  and uploaded_at > now() - interval '10 minutes';

-- Stuck pending rows (scanner probably choked)
select id, filename, uploaded_at from documents
where scan_status = 'pending'
  and uploaded_at < now() - interval '10 minutes';

-- Infected uploads in last 24h
select count(*) from documents
where scan_status = 'infected'
  and scanned_at > now() - interval '24 hours';

-- Scan error rate in last 24h
select
  scan_status,
  count(*) as n,
  round(count(*) * 100.0 / sum(count(*)) over (), 2) as pct
from documents
where uploaded_at > now() - interval '24 hours'
group by scan_status;

-- Average scan latency
select
  avg(extract(epoch from scanned_at - uploaded_at)) as avg_seconds,
  percentile_cont(0.95) within group (order by extract(epoch from scanned_at - uploaded_at)) as p95_seconds
from documents
where scan_status in ('clean', 'infected')
  and uploaded_at > now() - interval '24 hours';
```

## Rollback plan

If the ClamAV service causes problems:

1. **Disable the webhook** in Supabase Dashboard (Database → Webhooks → toggle off `scan-document-trigger`)
2. **New uploads will stay in `pending` state** — they won't be scanned, but the app can still render them with a "scanning…" UI
3. **Optionally pause uploads** by flipping a feature flag (`disable_document_uploads`)
4. **Debug Railway service** — check logs, restart if needed
5. **Re-enable the webhook** once service is healthy
6. **Reprocess stuck `pending` rows** with a manual cron or admin action that re-triggers the Edge Function with the stored `storage_path`

## Token rotation

Run every 90 days:

```bash
# Generate new token
NEW_TOKEN=$(openssl rand -hex 32)

# Update Railway
railway variables set CLAMAV_SERVICE_TOKEN=$NEW_TOKEN --service benefind-clamav

# Update Supabase Edge Function
supabase secrets set CLAMAV_SERVICE_TOKEN=$NEW_TOKEN

# Redeploy the Railway service to pick up the new token
railway up --service benefind-clamav

# The Edge Function doesn't need to redeploy — it reads env vars on each invocation

# Verify
curl -X POST "$RAILWAY_URL/scan" -H "Authorization: Bearer $NEW_TOKEN" \
  -F "file=@/tmp/eicar.txt"
```

## Related

- [`docker/clamav-service/README.md`](../docker/clamav-service/README.md) — sidecar service details
- [`supabase/functions/scan-document/index.ts`](../supabase/functions/scan-document/index.ts) — Edge Function source
- [`supabase/migrations/20260410_0001_documents_table.sql`](../supabase/migrations/20260410_0001_documents_table.sql) — table migration
- [`src/lib/documents/scan.ts`](../src/lib/documents/scan.ts) — client-side helpers
- [`docs/data-model.md`](./data-model.md) §D4 and Table 13 — documents schema spec
