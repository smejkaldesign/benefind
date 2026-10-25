import { requireAuth } from "@/components/auth-guard";
import { PageHeader } from "@/components/layout/page-header";
import { DocumentList } from "./document-list";
import { UploadForm } from "./upload-form";
import { getServerI18n } from "@/lib/i18n/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { getWorkspaceAccess } from "@/lib/billing/workspace-access";
import { planFamilyFor } from "@/lib/billing/plans";
import { PremiumGate } from "@/components/premium-gate";

export default async function DocumentsPage() {
  const user = await requireAuth();
  const supabase = await createServerSupabase();
  const [{ t }, access] = await Promise.all([
    getServerI18n(),
    getWorkspaceAccess(supabase, user.id),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.app.documents.title}
        description={t.app.documents.description}
      />

      <PremiumGate
        allowed={access?.entitlements.documents ?? false}
        feature="documents"
        plan={planFamilyFor(access?.workspace.type ?? "individual")}
      >
        <UploadForm />
        <DocumentList />
      </PremiumGate>
    </div>
  );
}
