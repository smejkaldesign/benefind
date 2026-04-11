#!/bin/sh
set -e

echo "[entrypoint] starting freshclam daemon for signature updates..."
freshclam -d &

echo "[entrypoint] starting clamd..."
clamd &
CLAMD_PID=$!

# Wait for clamd to be ready. --ping alone can succeed before signatures
# finish loading, so after ping passes we also run an actual test scan
# against a known-clean file to confirm clamd can handle real scan requests.
echo "[entrypoint] waiting for clamd to be ready..."
TIMEOUT=180
ELAPSED=0
TEST_FILE=/tmp/clamd-readiness-check.txt
echo "readiness probe" > "$TEST_FILE"

while true; do
  if clamdscan --ping 1 2>/dev/null; then
    # --ping passed; now verify a real scan completes
    if clamdscan --no-summary --fdpass "$TEST_FILE" >/dev/null 2>&1; then
      break
    fi
  fi
  if [ $ELAPSED -ge $TIMEOUT ]; then
    echo "[entrypoint] ERROR: clamd did not become fully ready within ${TIMEOUT}s"
    rm -f "$TEST_FILE"
    exit 1
  fi
  sleep 2
  ELAPSED=$((ELAPSED + 2))
done
rm -f "$TEST_FILE"
echo "[entrypoint] clamd is ready (ping + test-scan) after ${ELAPSED}s"

echo "[entrypoint] starting HTTP server on port ${PORT:-8080}"
exec deno run \
  --allow-net \
  --allow-env \
  --allow-run=clamdscan \
  --allow-read=/tmp \
  --allow-write=/tmp \
  /app/server.ts
