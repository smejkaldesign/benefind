"use client";

import { useRef, useState } from "react";
import { useWorkspace } from "@/lib/workspace/context";
import { createClient } from "@/lib/supabase/client";
import { createDocumentRow } from "@/lib/db/documents";
import {
  validateUploadFile,
  buildStoragePath,
  scanStatusMessage,
} from "@/lib/documents/scan";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type UploadState =
  | { status: "idle" }
  | { status: "validating" }
  | { status: "uploading"; filename: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function UploadForm() {
  const { workspace } = useWorkspace();
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
      setState({ status: "error", message: validation.error! });
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
        message: `Upload failed: ${uploadError.message}`,
      });
      resetInput();
      return;
    }

    // Get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setState({ status: "error", message: "Session expired. Please log in." });
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
        message: `Failed to save document record: ${insertError.message}`,
      });
      resetInput();
      return;
    }

    setState({
      status: "success",
      message: scanStatusMessage({
        scan_status: doc.scan_status,
        filename: doc.filename,
        scan_error: doc.scan_error,
      }),
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
          <h2 className="font-semibold text-text">Upload a file</h2>
          <p className="text-sm text-text-muted">
            PDF, images, and Office documents up to 25 MB
          </p>
        </div>
      </div>

      <p id="upload-help" className="sr-only">
        Accepted: PDF, plain text, Microsoft Office, and image files. Maximum 25
        MB.
      </p>
      <div className="flex items-center gap-3">
        <label className="sr-only" htmlFor="document-upload">
          Choose file to upload
        </label>
        <input
          id="document-upload"
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          disabled={isUploading || !workspace}
          aria-describedby="upload-help"
          className="block w-full text-sm text-text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand hover:file:bg-brand/20 disabled:opacity-50"
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
          Uploading &quot;{state.filename}&quot;...
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
