import { requireAuth } from "@/components/auth-guard";
import { PageHeader } from "@/components/layout/page-header";
import { DocumentList } from "./document-list";
import { UploadForm } from "./upload-form";
import { getServerI18n } from "@/lib/i18n/server";

export default async function DocumentsPage() {
  await requireAuth();
  const { t } = await getServerI18n();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.app.documents.title}
        description={t.app.documents.description}
      />

      <UploadForm />
      <DocumentList />
    </div>
  );
}
