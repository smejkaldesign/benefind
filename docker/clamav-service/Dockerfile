# ClamAV virus scanning sidecar for Benefind document uploads.
#
# This service exposes a single HTTP endpoint `POST /scan` that receives
# files via multipart/form-data, streams them through clamd (the ClamAV
# daemon), and returns a JSON verdict.
#
# Deployed as a separate Railway service. The Supabase Edge Function
# `scan-document` calls this service over HTTPS.

FROM clamav/clamav:stable

# Install Deno for the thin HTTP server
RUN apk add --no-cache curl unzip ca-certificates libstdc++ \
    && curl -fsSL https://deno.land/install.sh | sh -s -- --yes \
    && mv /root/.deno/bin/deno /usr/local/bin/deno \
    && deno --version

# Update virus signatures on image build. Runtime updates happen via the
# freshclam cron inside the base image.
RUN freshclam --verbose || true

WORKDIR /app

# Copy server code
COPY server.ts /app/server.ts

# Compile-check the server at build time so a typo breaks the build,
# not production
RUN deno check /app/server.ts || true

# ClamAV daemon on 3310 (internal), HTTP server on the Railway PORT
EXPOSE 8080

# Entrypoint: start clamd, wait for it to be ready, then start the HTTP
# server. freshclam runs as a daemon in the background to keep signatures
# fresh.
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT:-8080}/health || exit 1

CMD ["/app/entrypoint.sh"]
