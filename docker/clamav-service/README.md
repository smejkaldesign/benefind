# ClamAV Scanner Service

Lightweight HTTP wrapper around [ClamAV](https://www.clamav.net/) for scanning user-uploaded documents in Benefind. Runs as a separate Railway service called by the Supabase Edge Function [`scan-document`](../../supabase/functions/scan-document/index.ts).

## Why a sidecar?

ClamAV needs ~1GB of memory and signature files that update daily. That's too heavy for a Supabase Edge Function (Deno isolates have tight memory + bundled-binary limits). A standalone Railway service is the right tradeoff:

- **Easy signature updates** — `freshclam` runs as a daemon inside the container
- **Memory headroom** — Railway's standard plan gives us 8GB, plenty for clamd
- **Separate deploy cadence** — scanner updates don't force a Benefind redeploy
- **Reusable** — if we add another product that needs virus scanning, it reuses this service

## Local development

```bash
cd docker/clamav-service
docker build -t benefind-clamav .
docker run -p 8080:8080 \
  -e CLAMAV_SERVICE_TOKEN=dev-token \
  -e PORT=8080 \
  benefind-clamav
```

Then test with:

```bash
# Clean file (should return status: "clean")
echo "hello world" > /tmp/clean.txt
curl -X POST http://localhost:8080/scan \
  -H "Authorization: Bearer dev-token" \
  -F "file=@/tmp/clean.txt"

# EICAR test file (should return status: "infected")
# The EICAR string is a harmless standard antivirus test string
printf 'X5O!P%%@AP[4\PZX54(P^^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*' > /tmp/eicar.txt
curl -X POST http://localhost:8080/scan \
  -H "Authorization: Bearer dev-token" \
  -F "file=@/tmp/eicar.txt"

# Health check
curl http://localhost:8080/health
```

## Deploying to Railway

**Prerequisites:**
- Railway CLI installed (`brew install railway`)
- Logged into the Benefind Railway project
- A generated `CLAMAV_SERVICE_TOKEN` (use `openssl rand -hex 32`)

**Steps:**

1. **Create the service** in the Railway dashboard:
   - Click "+ New" → "Empty Service"
   - Name: `benefind-clamav`
   - Connect to this repo, branch `main`
   - Root directory: `docker/clamav-service`
   - Watch path: `docker/clamav-service/**`

2. **Configure environment variables:**
   ```
   CLAMAV_SERVICE_TOKEN=<your-generated-token>
   PORT=8080
   ```

3. **Set the health check** in Railway service settings:
   - Path: `/health`
   - Timeout: 30s (signatures take time to load on cold start)

4. **Resource limits:**
   - Memory: 1 GB minimum, 2 GB recommended
   - CPU: 0.5 vCPU is plenty for MVP volume

5. **Deploy** — Railway will build the Dockerfile and expose the service at `https://benefind-clamav.up.railway.app` (or your custom domain).

6. **Copy the same `CLAMAV_SERVICE_TOKEN`** to the Supabase Edge Function environment:
   ```bash
   supabase secrets set CLAMAV_SERVICE_TOKEN=<token>
   supabase secrets set CLAMAV_SERVICE_URL=https://benefind-clamav.up.railway.app
   ```

7. **Verify the full round-trip** by uploading a file through the Benefind UI and checking the `documents` table for `scan_status` updates.

## Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌───────────────┐
│  Benefind   │ upload  │   Supabase       │ webhook │  Edge Function │
│  Client UI  │────────▶│   Storage        │────────▶│  scan-document │
└─────────────┘         │   (documents)    │         └───────┬───────┘
                        └──────────────────┘                 │
                                                             │ POST /scan
                                                             ▼
                                                  ┌────────────────────┐
                                                  │  Railway Service   │
                                                  │  benefind-clamav   │
                                                  │  ┌──────────────┐  │
                                                  │  │ Deno server  │  │
                                                  │  │     ↓        │  │
                                                  │  │ clamdscan    │  │
                                                  │  │     ↓        │  │
                                                  │  │   clamd      │  │
                                                  │  │     ↓        │  │
                                                  │  │  freshclam   │  │
                                                  │  └──────────────┘  │
                                                  └────────────────────┘
                                                             │
                                                   verdict   │
                                                             ▼
                                                  ┌────────────────────┐
                                                  │ Supabase documents │
                                                  │  scan_status       │
                                                  │  scanned_at        │
                                                  └────────────────────┘
```

## Security notes

- **Auth:** The `/scan` endpoint requires a bearer token (`CLAMAV_SERVICE_TOKEN`). This is a shared secret between the Supabase Edge Function and the Railway service. Rotate it by updating both places simultaneously.
- **Rate limiting:** Not implemented in v1. Railway's built-in request throttling is the ceiling for now. Add application-level rate limiting if abuse shows up in logs.
- **File cleanup:** Temp files are written to `/tmp` for scanning and deleted via `finally` block even on error. If the container crashes mid-scan, Railway restarts the container with a fresh filesystem.
- **No persistent storage:** The service is stateless. ClamAV signatures are refreshed daily via `freshclam` daemon and survive only until container restart (at which point `freshclam` runs again).

## Monitoring

Once deployed, the admin dashboard (when built per [`benefind-admin-tools-prd`](../../MyBrain/04-projects/benefind-admin-tools-prd.md)) will query:

```sql
-- Scan queue depth
select count(*) from documents
where scan_status = 'pending'
  and uploaded_at > now() - interval '10 minutes';

-- Infected uploads in last 24h
select count(*) from documents
where scan_status = 'infected'
  and scanned_at > now() - interval '24 hours';

-- Average scan latency
select avg(extract(epoch from scanned_at - uploaded_at)) as avg_seconds
from documents
where scan_status in ('clean', 'infected')
  and uploaded_at > now() - interval '24 hours';
```

Railway's built-in logs are the primary debugging surface:

```bash
railway logs --service benefind-clamav
```

Look for:
- `[scan] error:` lines → debug the Deno server
- `freshclam` messages → signature update failures
- `clamd` startup messages → daemon health

## Related

- [`supabase/functions/scan-document/index.ts`](../../supabase/functions/scan-document/index.ts) — the Edge Function that calls this service
- [`docs/clamav-deploy.md`](../../docs/clamav-deploy.md) — the full end-to-end deployment runbook
- [`docs/data-model.md`](../../docs/data-model.md) §D4 and Table 13 — the `documents` schema spec
