# Go-Live Communications Setup - Project Plan

**Date:** 2026-04-07
**Project:** Benefind
**Goal:** Set up production-ready email and communications infrastructure before go-live

---

## Phase 1: Resend SMTP Setup (30 min)

### 1.1 Create Resend Account & API Key
- Sign up / log in at resend.com
- Create an API key scoped to sending
- Store key securely (do NOT commit)

### 1.2 Verify Domain in Resend
- Add `benefind.ai` domain in Resend dashboard
- Add the required DNS records (DKIM, SPF, DMARC) in Cloudflare
- Wait for verification (usually <5 min with Cloudflare)

### 1.3 Configure Supabase Custom SMTP
- Supabase Dashboard > Project Settings > Authentication > SMTP Settings
- Enable Custom SMTP
- Host: `smtp.resend.com`
- Port: `465`
- Username: `resend`
- Password: Resend API key
- Sender name: `Benefind`
- Sender email: `noreply@benefind.ai` (must be on verified domain)

### 1.4 Verify
- Sign up with a test email
- Confirm magic link arrives from `noreply@benefind.ai` (not Supabase default)
- Check email renders correctly

---

## Phase 2: Custom Email Templates (45 min)

### 2.1 Magic Link Email Template
- Supabase Dashboard > Authentication > Email Templates
- Customize the "Magic Link" template:
  - Branded header with Benefind logo
  - Clean, minimal design matching the app's dark theme
  - Clear CTA button ("Sign in to Benefind")
  - Footer with unsubscribe/support info

### 2.2 Confirm Signup Email Template
- Customize the "Confirm Signup" template with same branding
- Welcome copy for new users

### 2.3 Invite User Email Template (if needed)
- Template for when admins invite users

---

## Phase 3: AgentMail Integration (45 min)

### 3.1 Create Benefind Inbox
- Use AgentMail MCP to create a dedicated inbox for Benefind
- Purpose: receive user feedback, support inquiries, form submissions

### 3.2 Add Contact/Feedback Form
- Add a simple contact or feedback mechanism in the app
- Route submissions to the AgentMail inbox
- Auto-reply confirmation to the user via AgentMail

### 3.3 Support Email Routing
- Set up `support@benefind.ai` or `hello@benefind.ai`
- Configure DNS MX records in Cloudflare to route to AgentMail (or forward to personal email for now)

---

## Phase 4: Transactional Email Foundation (30 min)

### 4.1 Add Resend SDK to Benefind
- `npm install resend`
- Create `/src/lib/email/client.ts` with Resend client
- Add `RESEND_API_KEY` to Railway env vars

### 4.2 Create Base Email Template
- Simple React Email template (or HTML) for transactional messages
- Benefind branding, responsive, dark-mode friendly
- Reusable for future notifications

### 4.3 Welcome Email on First Sign-in
- Trigger a welcome email after first successful authentication
- Brief intro to Benefind, what to expect, how to get help

---

## Phase 5: Go-Live Readiness Checklist (30 min)

### 5.1 DNS Health Check
- [ ] SPF record configured for benefind.ai
- [ ] DKIM records from Resend added
- [ ] DMARC policy set (start with `p=none` for monitoring)
- [ ] MX records configured (if using custom email receiving)

### 5.2 Email Deliverability
- [ ] Send test emails to Gmail, Outlook, Yahoo
- [ ] Check spam scores (mail-tester.com)
- [ ] Verify "from" address renders correctly

### 5.3 Rate Limits & Abuse Prevention
- [ ] Supabase rate limits reviewed (per-IP, not platform-wide with custom SMTP)
- [ ] Resend sending limits understood (free: 100/day, paid: 50k/month)
- [ ] Login page cooldown timer working correctly

### 5.4 Error Handling
- [ ] Email send failures logged (not silently swallowed)
- [ ] User sees friendly error if email fails to send
- [ ] Fallback behavior defined (retry? alternative?)

### 5.5 Security
- [ ] No secrets in client-side code
- [ ] Service role key only used server-side
- [ ] Email templates don't leak internal URLs
- [ ] Auth callback URLs use NEXT_PUBLIC_APP_URL (not request.url origin)

---

## Priority Order

If time is limited, do these in order:
1. **Phase 1** (Resend SMTP) - unblocks everything, fixes rate limit issue
2. **Phase 5** (Checklist) - verify nothing is broken
3. **Phase 2** (Templates) - professional first impression
4. **Phase 4** (Transactional foundation) - enables future features
5. **Phase 3** (AgentMail) - nice-to-have for launch
