// ClamAV HTTP wrapper service.
//
// Exposes POST /scan (multipart/form-data) → JSON verdict by shelling
// out to `clamdscan` against the local clamd daemon.
//
// Also exposes GET /health for Railway health checks.
//
// Auth: requires `Authorization: Bearer <CLAMAV_SERVICE_TOKEN>` header on
// /scan. The token is a shared secret with the Supabase Edge Function.

const PORT = parseInt(Deno.env.get("PORT") ?? "8080", 10);
const AUTH_TOKEN = Deno.env.get("CLAMAV_SERVICE_TOKEN");
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const TMP_DIR = "/tmp";

if (!AUTH_TOKEN) {
  console.error("FATAL: CLAMAV_SERVICE_TOKEN environment variable is required");
  Deno.exit(1);
}

interface ScanResponse {
  status: "clean" | "infected" | "error";
  threats?: string[];
  error?: string;
  scanned_bytes?: number;
  elapsed_ms?: number;
}

Deno.serve({ port: PORT, hostname: "0.0.0.0" }, async (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/health" && req.method === "GET") {
    return handleHealth();
  }

  if (url.pathname === "/scan" && req.method === "POST") {
    return handleScan(req);
  }

  return jsonResponse({ error: "not_found" }, 404);
});

console.log(`[server] ClamAV scanner listening on :${PORT}`);

// ----------------------------------------------------------------------------
// Handlers
// ----------------------------------------------------------------------------

async function handleHealth(): Promise<Response> {
  // Check that clamd is reachable by running a ping
  try {
    const cmd = new Deno.Command("clamdscan", {
      args: ["--ping", "1"],
      stdout: "piped",
      stderr: "piped",
    });
    const { code } = await cmd.output();
    if (code !== 0) {
      return jsonResponse({ status: "unhealthy", clamd: "not_responding" }, 503);
    }
    return jsonResponse({ status: "ok", clamd: "responding" }, 200);
  } catch (err) {
    return jsonResponse(
      { status: "unhealthy", error: String(err) },
      503,
    );
  }
}

async function handleScan(req: Request): Promise<Response> {
  const startTime = Date.now();

  // Verify auth
  const authHeader = req.headers.get("Authorization");
  if (authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return jsonResponse({ status: "error", error: "unauthorized" }, 401);
  }

  // Parse multipart form
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (err) {
    return jsonResponse(
      { status: "error", error: `invalid_multipart: ${String(err)}` },
      400,
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return jsonResponse(
      { status: "error", error: "no_file_in_request" },
      400,
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return jsonResponse(
      {
        status: "error",
        error: `file_too_large: ${file.size} bytes exceeds ${MAX_FILE_SIZE}`,
      },
      413,
    );
  }

  // Write to a temp file for clamdscan to read
  const tmpPath = `${TMP_DIR}/${crypto.randomUUID()}-${sanitizeFilename(file.name)}`;
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    await Deno.writeFile(tmpPath, bytes);

    const result = await runClamdScan(tmpPath);

    return jsonResponse(
      {
        ...result,
        scanned_bytes: file.size,
        elapsed_ms: Date.now() - startTime,
      } satisfies ScanResponse,
      200,
    );
  } catch (err) {
    console.error(`[scan] error: ${String(err)}`);
    return jsonResponse(
      { status: "error", error: String(err) } satisfies ScanResponse,
      500,
    );
  } finally {
    // Always clean up the temp file, even on error
    try {
      await Deno.remove(tmpPath);
    } catch {
      // File may not exist if write failed; ignore
    }
  }
}

// ----------------------------------------------------------------------------
// ClamAV runner
// ----------------------------------------------------------------------------

async function runClamdScan(path: string): Promise<ScanResponse> {
  const cmd = new Deno.Command("clamdscan", {
    args: ["--no-summary", "--fdpass", path],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stdout, stderr } = await cmd.output();
  const stdoutText = new TextDecoder().decode(stdout);
  const stderrText = new TextDecoder().decode(stderr);

  // clamdscan exit codes:
  //   0 = clean (no threats)
  //   1 = infected (threats found)
  //   2 = error
  if (code === 0) {
    return { status: "clean" };
  }

  if (code === 1) {
    // Parse threat names from stdout: "<path>: <threat> FOUND"
    const threats = stdoutText
      .split("\n")
      .map((line) => {
        const match = line.match(/:\s*(.+?)\s+FOUND$/);
        return match?.[1]?.trim();
      })
      .filter((t): t is string => Boolean(t));
    return {
      status: "infected",
      threats: threats.length > 0 ? threats : ["unknown"],
    };
  }

  // code === 2 or anything else: scanner error
  return {
    status: "error",
    error: `clamdscan exit ${code}: ${stderrText.trim() || stdoutText.trim()}`,
  };
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function sanitizeFilename(name: string): string {
  // Strip any path components, keep only the basename, replace unsafe chars
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
