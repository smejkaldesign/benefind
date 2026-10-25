"use client";

import { useRef, useState } from "react";
import { useWorkspace } from "@/lib/workspace/context";
import { createClient } from "@/lib/supabase/client";
import { createDocumentRow } from "@/lib/db/documents";
import {
  validateUploadFile,
  buildStoragePath,
  MAX_UPLOAD_BYTES,
} from "@/lib/documents/scan";
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Tables } from "@/types/database";
import { Card } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function validationMessage(
  file: { type: string },
  error: string,
  t: Dictionary,
): string {
  const m = t.app.documents;
  if (error.startsWith("File is empty")) return m.fileEmpty;
  if (error.startsWith("File is too large"))
    return fmt(m.fileTooLarge, {
      max: Math.round(MAX_UPLOAD_BYTES / 1024 / 1024),
    });
  if (error.startsWith("Invalid filename")) return m.invalidFilename;
  return fmt(m.unsupportedType, { type: file.type || m.unknownType });
}

function scanMessage(
  doc: Pick<Tables<"documents">, "scan_status" | "filename">,
  t: Dictionary,
): string {
  const m = t.app.documents;
  const name = doc.filename?.trim() || m.fallbackName;
  switch (doc.scan_status) {
    case "pending":
      return fmt(m.scanPending, { name });
    case "clean":
      return fmt(m.scanClean, { name });
    case "infected":
      return fmt(m.scanInfected, { name });
    case "error":
      return fmt(m.scanError, { name });
  }
}

type UploadState =
  | { status: "idle" }
  | { status: "validating" }
  | { status: "uploading"; filename: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function UploadForm() {
  const { workspace } = useWorkspace();
  const { t } = useI18n();
  const [state, setState] = useState<UploadState>({ status: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !workspace) return;

    // Validate client-side
    setState({ status: "validating" });
    const validation = validateUploadFile(file);
    if (!validation.ok) {
      setState({
        status: "error",
        message: validationMessage(file, validation.error ?? "", t),
      });
      resetInput();
      return;
    }

    // Upload to Supabase Storage
    setState({ status: "uploading", filename: file.name });
    const supabase = createClient();
    const storagePath = buildStoragePath(workspace.id, file.name);

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      setState({
        status: "error",
        message: t.app.documents.uploadFailed,
      });
      resetInput();
      return;
    }

    // Get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setState({ status: "error", message: t.app.documents.sessionExpired });
      resetInput();
      return;
    }

    // Insert document row
    const { data: doc, error: insertError } = await createDocumentRow(
      supabase,
      {
        workspaceId: workspace.id,
        uploadedByUserId: user.id,
        filename: file.name,
        storagePath,
        mimeType: file.type || null,
        byteSize: file.size,
      },
    );

    if (insertError) {
      setState({
        status: "error",
        message: t.app.documents.saveFailed,
      });
      resetInput();
      return;
    }

    setState({
      status: "success",
      message: scanMessage(doc, t),
    });

    resetInput();
    router.refresh();
  }

  function resetInput() {
    if (inputRef.current) inputRef.current.value = "";
  }

  const isUploading =
    state.status === "validating" || state.status === "uploading";

  return (
    <Card className="space-y-3">
      <div className="flex items-center gap-3">
        <Upload className="h-5 w-5 text-text-muted" aria-hidden="true" />
        <div>
          <h2 className="font-semibold text-text">
            {t.app.documents.uploadTitle}
          </h2>
          <p className="text-sm text-text-muted">
            {t.app.documents.uploadHint}
          </p>
        </div>
      </div>

      <p id="upload-help" className="sr-only">
        {t.app.documents.uploadHelp}
      </p>
      <div className="flex items-center gap-3">
        <label className="sr-only" htmlFor="document-upload">
          {t.app.documents.chooseFile}
        </label>
        <input
          id="document-upload"
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          disabled={isUploading || !workspace}
          aria-describedby="upload-help"
          className="block w-full text-sm text-text-muted file:me-3 file:rounded-lg file:border-0 file:bg-brand/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand hover:file:bg-brand/20 disabled:opacity-50"
          accept=".pdf,.txt,.doc,.docx,.xls,.xlsx,.pptx,.jpg,.jpeg,.png,.gif,.webp,.heic,.heif"
        />
        {isUploading && (
          <Loader2
            className="h-4 w-4 animate-spin text-brand"
            aria-hidden="true"
          />
        )}
      </div>

      {state.status === "uploading" && (
        <p className="text-sm text-text-muted">
          {fmt(t.app.documents.uploading, { name: state.filename })}
        </p>
      )}
      {state.status === "success" && (
        <p className="text-sm text-brand">{state.message}</p>
      )}
      {state.status === "error" && (
        <p className="text-sm text-error">{state.message}</p>
      )}
    </Card>
  );
}
