import { describe, it, expect } from "vitest";
import {
  buildStoragePath,
  sanitizeFilename,
  isTerminalScanStatus,
  nextPollInterval,
  shouldContinuePolling,
  validateUploadFile,
  buildCreateDocumentInput,
  scanStatusMessage,
  MAX_UPLOAD_BYTES,
  DEFAULT_POLL_CONFIG,
} from "../scan";
import {
  isDocumentDownloadable,
  scanStatusLabel,
  isScanPending,
  isScanFailed,
  type Document,
} from "../types";

describe("sanitizeFilename", () => {
  it("strips unsafe characters", () => {
    expect(sanitizeFilename("my file.pdf")).toBe("my_file.pdf");
    expect(sanitizeFilename("résumé.pdf")).toBe("r_sum_.pdf");
  });

  it("strips directory traversal slashes (defense in depth)", () => {
    // Dots themselves are allowed (they're extension separators).
    // Slashes are the actual directory-traversal risk and must be stripped.
    // The workspace_id namespacing in buildStoragePath is the primary defense;
    // this is just belt-and-suspenders.
    expect(sanitizeFilename("../../etc/passwd")).not.toContain("/");
    expect(sanitizeFilename("../../etc/passwd")).not.toContain("\\");
  });

  it("preserves extension", () => {
    expect(sanitizeFilename("test.pdf")).toBe("test.pdf");
    expect(sanitizeFilename("test.docx")).toBe("test.docx");
  });

  it("handles filenames without extension", () => {
    expect(sanitizeFilename("README")).toBe("README");
  });

  it("truncates overly long filenames", () => {
    const long = "a".repeat(200) + ".pdf";
    const result = sanitizeFilename(long);
    expect(result.length).toBeLessThanOrEqual(80 + ".pdf".length);
    expect(result.endsWith(".pdf")).toBe(true);
  });

  it("handles edge cases with dots", () => {
    expect(sanitizeFilename(".hidden")).toBe(".hidden"); // no base, just ext
    expect(sanitizeFilename("foo.bar.baz")).toBe("foo.bar.baz");
  });
});

describe("buildStoragePath", () => {
  it("namespaces by workspace_id", () => {
    const path = buildStoragePath("ws-123", "test.pdf");
    expect(path).toMatch(/^ws-123\//);
  });

  it("includes a UUID to prevent collisions", () => {
    const path1 = buildStoragePath("ws-1", "test.pdf");
    const path2 = buildStoragePath("ws-1", "test.pdf");
    expect(path1).not.toBe(path2);
  });

  it("sanitizes the filename in the path", () => {
    const path = buildStoragePath("ws-1", "my file (1).pdf");
    expect(path).not.toContain(" ");
    expect(path).not.toContain("(");
    expect(path).toMatch(/\.pdf$/);
  });
});

describe("isTerminalScanStatus", () => {
  it("returns false for pending", () => {
    expect(isTerminalScanStatus("pending")).toBe(false);
  });

  it("returns true for all terminal states", () => {
    expect(isTerminalScanStatus("clean")).toBe(true);
    expect(isTerminalScanStatus("infected")).toBe(true);
    expect(isTerminalScanStatus("error")).toBe(true);
  });
});

describe("nextPollInterval", () => {
  it("backs off exponentially", () => {
    expect(nextPollInterval(2000)).toBe(3000);
    expect(nextPollInterval(3000)).toBe(4500);
    expect(nextPollInterval(4500)).toBeGreaterThan(4500);
  });

  it("caps at maxIntervalMs", () => {
    expect(nextPollInterval(9000)).toBe(10000); // 9000 * 1.5 = 13500, capped at 10000
    expect(nextPollInterval(10000)).toBe(10000); // already at cap
    expect(nextPollInterval(15000)).toBe(10000); // over cap
  });

  it("respects custom config", () => {
    const config = {
      initialIntervalMs: 1000,
      maxIntervalMs: 5000,
      maxDurationMs: 30000,
      backoffFactor: 2,
    };
    expect(nextPollInterval(1000, config)).toBe(2000);
    expect(nextPollInterval(3000, config)).toBe(5000); // capped
  });
});

describe("shouldContinuePolling", () => {
  it("returns true when within the duration window", () => {
    const now = Date.now();
    expect(shouldContinuePolling(now, now)).toBe(true);
    expect(shouldContinuePolling(now, now + 30000)).toBe(true);
  });

  it("returns false after maxDurationMs", () => {
    const now = Date.now();
    expect(shouldContinuePolling(now, now + 60000)).toBe(false);
    expect(shouldContinuePolling(now, now + 70000)).toBe(false);
  });

  it("respects custom config", () => {
    const config = { ...DEFAULT_POLL_CONFIG, maxDurationMs: 5000 };
    const now = Date.now();
    expect(shouldContinuePolling(now, now + 3000, config)).toBe(true);
    expect(shouldContinuePolling(now, now + 6000, config)).toBe(false);
  });
});

describe("validateUploadFile", () => {
  it("accepts a valid PDF", () => {
    const result = validateUploadFile({
      size: 1024 * 1024, // 1 MB
      type: "application/pdf",
      name: "resume.pdf",
    });
    expect(result.ok).toBe(true);
  });

  it("accepts images", () => {
    expect(
      validateUploadFile({
        size: 500_000,
        type: "image/png",
        name: "paystub.png",
      }).ok,
    ).toBe(true);
    expect(
      validateUploadFile({
        size: 500_000,
        type: "image/jpeg",
        name: "id.jpg",
      }).ok,
    ).toBe(true);
  });

  it("accepts Office documents", () => {
    expect(
      validateUploadFile({
        size: 500_000,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        name: "letter.docx",
      }).ok,
    ).toBe(true);
  });

  it("rejects empty files", () => {
    const result = validateUploadFile({
      size: 0,
      type: "application/pdf",
      name: "empty.pdf",
    });
    expect(result.ok).toBe(false);
    expect(result.error).toContain("empty");
  });

  it("rejects files over the size limit", () => {
    const result = validateUploadFile({
      size: MAX_UPLOAD_BYTES + 1,
      type: "application/pdf",
      name: "huge.pdf",
    });
    expect(result.ok).toBe(false);
    expect(result.error).toContain("too large");
  });

  it("accepts files exactly at the size limit", () => {
    const result = validateUploadFile({
      size: MAX_UPLOAD_BYTES,
      type: "application/pdf",
      name: "max.pdf",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects executables", () => {
    expect(
      validateUploadFile({
        size: 1000,
        type: "application/x-msdownload",
        name: "malware.exe",
      }).ok,
    ).toBe(false);
  });

  it("rejects files with unknown mime type", () => {
    expect(
      validateUploadFile({
        size: 1000,
        type: "",
        name: "suspicious.bin",
      }).ok,
    ).toBe(false);
  });

  it("rejects files with empty name", () => {
    expect(
      validateUploadFile({
        size: 1000,
        type: "application/pdf",
        name: "",
      }).ok,
    ).toBe(false);
  });

  it("rejects files with excessively long names", () => {
    const longName = "a".repeat(300) + ".pdf";
    expect(
      validateUploadFile({
        size: 1000,
        type: "application/pdf",
        name: longName,
      }).ok,
    ).toBe(false);
  });
});

describe("buildCreateDocumentInput", () => {
  it("builds a valid input from an upload event", () => {
    const file = new File(["hello"], "test.pdf", {
      type: "application/pdf",
    });
    const input = buildCreateDocumentInput({
      workspaceId: "ws-123",
      file,
      storagePath: "ws-123/abc-test.pdf",
    });
    expect(input.workspace_id).toBe("ws-123");
    expect(input.filename).toBe("test.pdf");
    expect(input.mime_type).toBe("application/pdf");
    expect(input.byte_size).toBe(5); // "hello" is 5 bytes
    expect(input.storage_path).toBe("ws-123/abc-test.pdf");
    expect(input.tags).toBeUndefined();
  });

  it("includes tags when provided", () => {
    const file = new File(["data"], "test.pdf", { type: "application/pdf" });
    const input = buildCreateDocumentInput({
      workspaceId: "ws-1",
      file,
      storagePath: "ws-1/test.pdf",
      tags: ["income", "2025"],
    });
    expect(input.tags).toEqual(["income", "2025"]);
  });

  it("omits empty tags array", () => {
    const file = new File(["data"], "test.pdf", { type: "application/pdf" });
    const input = buildCreateDocumentInput({
      workspaceId: "ws-1",
      file,
      storagePath: "ws-1/test.pdf",
      tags: [],
    });
    expect(input.tags).toBeUndefined();
  });

  it("handles files with no mime type", () => {
    const file = new File(["data"], "test.pdf", { type: "" });
    const input = buildCreateDocumentInput({
      workspaceId: "ws-1",
      file,
      storagePath: "ws-1/test.pdf",
    });
    expect(input.mime_type).toBeUndefined();
  });
});

describe("scanStatusMessage", () => {
  const base = {
    filename: "test.pdf",
    scan_error: null,
  };

  it("shows a 'checking' message with time expectation for pending", () => {
    const msg = scanStatusMessage({ ...base, scan_status: "pending" });
    expect(msg).toContain("Checking");
    expect(msg).toContain("few seconds");
  });

  it("shows safe message for clean", () => {
    expect(scanStatusMessage({ ...base, scan_status: "clean" })).toContain(
      "safe",
    );
  });

  it("uses the softer 'security check' framing for infected (no 'virus scanner' jargon)", () => {
    const msg = scanStatusMessage({ ...base, scan_status: "infected" });
    expect(msg).toContain("couldn't accept");
    expect(msg).toContain("security check");
    expect(msg).not.toContain("virus scanner");
  });

  it("hides raw scan_error from the user-facing error message (defense in depth)", () => {
    // Per NOIR review on PR #11: raw scan_error may contain stack traces,
    // timeouts, or Docker errors that should never reach users. The generic
    // friendly message is always shown; technical detail stays in logs.
    const msg = scanStatusMessage({
      ...base,
      scan_status: "error",
      scan_error: "network timeout",
    });
    expect(msg).not.toContain("network timeout");
    expect(msg).toContain("Something went wrong");
    expect(msg).toContain("contact support");
  });

  it("provides generic fallback when scan_error is null", () => {
    const msg = scanStatusMessage({ ...base, scan_status: "error" });
    expect(msg).toContain("Something went wrong");
  });

  it("falls back to 'your file' when filename is empty", () => {
    const msg = scanStatusMessage({
      ...base,
      filename: "",
      scan_status: "pending",
    });
    expect(msg).toContain("your file");
    expect(msg).not.toContain('""');
  });
});

describe("type helpers", () => {
  const cleanDoc: Pick<Document, "scan_status" | "deleted_at"> = {
    scan_status: "clean",
    deleted_at: null,
  };

  it("isDocumentDownloadable: clean + not deleted → true", () => {
    expect(isDocumentDownloadable(cleanDoc)).toBe(true);
  });

  it("isDocumentDownloadable: infected → false", () => {
    expect(
      isDocumentDownloadable({ scan_status: "infected", deleted_at: null }),
    ).toBe(false);
  });

  it("isDocumentDownloadable: pending → false", () => {
    expect(
      isDocumentDownloadable({ scan_status: "pending", deleted_at: null }),
    ).toBe(false);
  });

  it("isDocumentDownloadable: soft-deleted → false", () => {
    expect(
      isDocumentDownloadable({
        scan_status: "clean",
        deleted_at: "2026-04-10T00:00:00Z",
      }),
    ).toBe(false);
  });

  it("scanStatusLabel returns a non-empty string for all states", () => {
    expect(scanStatusLabel("pending")).toBeTruthy();
    expect(scanStatusLabel("clean")).toBeTruthy();
    expect(scanStatusLabel("infected")).toBeTruthy();
    expect(scanStatusLabel("error")).toBeTruthy();
  });

  it("isScanPending only matches pending", () => {
    expect(isScanPending("pending")).toBe(true);
    expect(isScanPending("clean")).toBe(false);
    expect(isScanPending("infected")).toBe(false);
    expect(isScanPending("error")).toBe(false);
  });

  it("isScanFailed matches error and infected", () => {
    expect(isScanFailed("error")).toBe(true);
    expect(isScanFailed("infected")).toBe(true);
    expect(isScanFailed("clean")).toBe(false);
    expect(isScanFailed("pending")).toBe(false);
  });
});
