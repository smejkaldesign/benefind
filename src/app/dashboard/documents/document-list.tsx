"use client";

import { useEffect, useState, useCallback } from "react";
import { useWorkspace } from "@/lib/workspace/context";
import { createClient } from "@/lib/supabase/client";
import { listDocuments, softDeleteDocument } from "@/lib/db/documents";
import {
  scanStatusLabel,
  isScanPending,
  isDocumentDownloadable,
} from "@/lib/documents/types";
import {
  DEFAULT_POLL_CONFIG,
  nextPollInterval,
  shouldContinuePolling,
} from "@/lib/documents/scan";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Trash2,
  Download,
} from "lucide-react";
import type { Tables } from "@/types/database";

type Document = Tables<"documents">;

export function DocumentList() {
  const { workspace } = useWorkspace();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    if (!workspace) return;
    const supabase = createClient();
    const { data } = await listDocuments(supabase, workspace.id);
    if (data) setDocuments(data);
    setLoading(false);
  }, [workspace]);

  // Initial fetch
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Poll for pending scans
  useEffect(() => {
    const hasPending = documents.some((d) => isScanPending(d.scan_status));
    if (!hasPending) return;

    const startedAt = Date.now();
    let interval = DEFAULT_POLL_CONFIG.initialIntervalMs;
    let timer: ReturnType<typeof setTimeout>;

    function poll() {
      if (!shouldContinuePolling(startedAt)) {
        // Stop polling, user can refresh manually
        return;
      }
      timer = setTimeout(() => {
        fetchDocuments();
        interval = nextPollInterval(interval);
        poll();
      }, interval);
    }

    poll();
    return () => clearTimeout(timer);
  }, [documents, fetchDocuments]);

  async function handleDelete(docId: string) {
    setDeletingId(docId);
    const supabase = createClient();
    const { error } = await softDeleteDocument(supabase, docId);
    if (!error) {
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    }
    setDeletingId(null);
  }

  async function handleDownload(doc: Document) {
    const supabase = createClient();
    const { data } = await supabase.storage
      .from(doc.storage_bucket)
      .createSignedUrl(doc.storage_path, 60);
    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
  }

  if (loading) {
    return (
      <Card className="flex items-center justify-center py-12">
        <Loader2
          className="h-6 w-6 animate-spin text-text-muted"
          aria-hidden="true"
        />
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card className="py-12 text-center">
        <FileText
          className="mx-auto h-10 w-10 text-text-subtle"
          aria-hidden="true"
        />
        <p className="mt-3 text-sm text-text-muted">
          No documents yet. Upload your first file above.
        </p>
      </Card>
    );
  }

  return (
    <Card padding={false}>
      <div className="divide-y divide-border">
        {documents.map((doc) => (
          <DocumentRow
            key={doc.id}
            doc={doc}
            deleting={deletingId === doc.id}
            onDelete={() => handleDelete(doc.id)}
            onDownload={() => handleDownload(doc)}
          />
        ))}
      </div>
    </Card>
  );
}

function DocumentRow({
  doc,
  deleting,
  onDelete,
  onDownload,
}: {
  doc: Document;
  deleting: boolean;
  onDelete: () => void;
  onDownload: () => void;
}) {
  const downloadable = isDocumentDownloadable(doc);

  return (
    <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
      <ScanStatusIcon status={doc.scan_status} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">{doc.filename}</p>
        <div className="flex items-center gap-2">
          <ScanBadge status={doc.scan_status} />
          {doc.byte_size != null && (
            <span className="text-xs text-text-subtle">
              {formatBytes(doc.byte_size)}
            </span>
          )}
          <span className="text-xs text-text-subtle">
            {new Date(doc.uploaded_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {downloadable && (
          <Button variant="ghost" size="icon-sm" onClick={onDownload}>
            <Download className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Download {doc.filename}</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onDelete}
          disabled={deleting}
        >
          {deleting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Trash2 className="h-4 w-4 text-text-muted" aria-hidden="true" />
          )}
          <span className="sr-only">Delete {doc.filename}</span>
        </Button>
      </div>
    </div>
  );
}

function ScanStatusIcon({ status }: { status: Document["scan_status"] }) {
  switch (status) {
    case "pending":
      return (
        <Loader2
          className="h-5 w-5 animate-spin text-text-muted"
          aria-hidden="true"
        />
      );
    case "clean":
      return <CheckCircle2 className="h-5 w-5 text-brand" aria-hidden="true" />;
    case "infected":
      return (
        <AlertTriangle className="h-5 w-5 text-error" aria-hidden="true" />
      );
    case "error":
      return (
        <AlertTriangle className="h-5 w-5 text-warning" aria-hidden="true" />
      );
  }
}

function ScanBadge({ status }: { status: Document["scan_status"] }) {
  const label = scanStatusLabel(status);
  const variant =
    status === "clean"
      ? "success"
      : status === "infected"
        ? "error"
        : status === "error"
          ? "warning"
          : "default";

  return (
    <Badge variant={variant} className="text-xs">
      {label}
    </Badge>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
