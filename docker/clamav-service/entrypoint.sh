#!/bin/sh
set -e

echo "[entrypoint] starting freshclam daemon for signature updates..."
freshclam -d &

echo "[entrypoint] starting clamd..."
clamd &
CLAMD_PID=$!

# Wait for clamd to be ready (it takes ~10-30 seconds to load signatures)
echo "[entrypoint] waiting for clamd to be ready..."
TIMEOUT=120
ELAPSED=0
while ! clamdscan --ping 1 2>/dev/null; do
  if [ $ELAPSED -ge $TIMEOUT ]; then
    echo "[entrypoint] ERROR: clamd did not become ready within ${TIMEOUT}s"
    exit 1
  fi
  sleep 2
  ELAPSED=$((ELAPSED + 2))
done
echo "[entrypoint] clamd is ready after ${ELAPSED}s"

echo "[entrypoint] starting HTTP server on port ${PORT:-8080}"
exec deno run \
  --allow-net \
  --allow-env \
  --allow-run=clamdscan \
  --allow-read=/tmp \
  --allow-write=/tmp \
  /app/server.ts
