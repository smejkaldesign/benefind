import { createServerSupabase } from "@/lib/supabase/server";
import { getAdminStats } from "@/lib/db/admin";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabase();
  const stats = await getAdminStats(supabase);

  const cards = [
    { label: "Workspaces", value: stats.workspaceCount },
    { label: "Screenings", value: stats.screeningCount },
    { label: "Docs Pending Scan", value: stats.docsPendingCount },
    { label: "Docs Infected", value: stats.docsInfectedCount },
    { label: "Open Tickets", value: stats.openTicketCount },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Platform overview and monitoring"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardTitle className="text-xs uppercase tracking-wide text-text-muted">
              {card.label}
            </CardTitle>
            <p className="mt-1 text-2xl font-bold text-text">{card.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
