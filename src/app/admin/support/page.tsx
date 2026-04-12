import { createServerSupabase } from "@/lib/supabase/server";
import {
  listSupportTickets,
  listRecentScreenings,
  getAdminStats,
} from "@/lib/db/admin";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminSupportPage() {
  const supabase = await createServerSupabase();

  const [ticketsResult, screeningsResult, stats] = await Promise.all([
    listSupportTickets(supabase, { limit: 25 }),
    listRecentScreenings(supabase, 20),
    getAdminStats(supabase),
  ]);

  const tickets = ticketsResult.data ?? [];
  const screenings = screeningsResult.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support & Monitoring"
        description="Tickets, screenings, and document scan health"
      />

      {/* Document Scan Monitoring */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardTitle className="text-xs uppercase tracking-wide text-text-muted">
            Pending Scans
          </CardTitle>
          <p className="mt-1 text-2xl font-bold text-text">
            {stats.docsPendingCount}
          </p>
        </Card>
        <Card>
          <CardTitle className="text-xs uppercase tracking-wide text-text-muted">
            Infected Documents
          </CardTitle>
          <p className="mt-1 text-2xl font-bold text-error">
            {stats.docsInfectedCount}
          </p>
        </Card>
      </div>

      {/* Support Tickets */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-text">Support Tickets</h2>
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-border last:border-0 hover:bg-surface-bright"
                  >
                    <td className="px-4 py-3 font-medium text-text">
                      {ticket.subject}
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {ticket.email}
                    </td>
                    <td className="px-4 py-3">
                      <TicketStatusBadge status={ticket.status} />
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {tickets.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-text-muted"
                    >
                      No support tickets.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Recent Screenings */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-text">Recent Screenings</h2>
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-muted">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Workspace</th>
                  <th className="px-4 py-3 font-medium">Language</th>
                  <th className="px-4 py-3 font-medium">State</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {screenings.map((screening) => (
                  <tr
                    key={screening.id}
                    className="border-b border-border last:border-0 hover:bg-surface-bright"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">
                      {screening.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">
                      {screening.workspace_id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {screening.language}
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {screening.state ?? "N/A"}
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {new Date(screening.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {screenings.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-text-muted"
                    >
                      No screenings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

const VALID_TICKET_STATUSES = [
  "open",
  "pending",
  "resolved",
  "closed",
] as const;
type TicketStatus = (typeof VALID_TICKET_STATUSES)[number];

function isValidTicketStatus(value: string): value is TicketStatus {
  return (VALID_TICKET_STATUSES as readonly string[]).includes(value);
}

function TicketStatusBadge({ status }: { status: string }) {
  const variantMap: Record<
    TicketStatus,
    "error" | "warning" | "success" | "default"
  > = {
    open: "error",
    pending: "warning",
    resolved: "success",
    closed: "default",
  };

  if (!isValidTicketStatus(status)) {
    return <Badge variant="default">{status}</Badge>;
  }

  return <Badge variant={variantMap[status]}>{status}</Badge>;
}
