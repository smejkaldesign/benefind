import { requireAuth } from "@/components/auth-guard";
import { PageHeader } from "@/components/layout/page-header";
import { DocumentList } from "./document-list";
import { UploadForm } from "./upload-form";

export default async function DocumentsPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Upload and manage your files. All uploads are scanned for security."
      />

      <UploadForm />
      <DocumentList />
    </div>
  );
}
