import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { listAllPrograms } from "@/lib/db/admin";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminProgramsPage() {
  const supabase = await createServerSupabase();
  const { data: programs, error } = await listAllPrograms(supabase);

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Programs" description="Manage benefit programs" />
        <Card>
          <p className="text-sm text-error">
            Failed to load programs. Please try again.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Programs" description="Manage benefit programs" />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-text-muted">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Track</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr
                  key={program.id}
                  className="border-b border-border last:border-0 hover:bg-surface-bright"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/programs/${program.id}`}
                      className="font-medium text-brand hover:underline"
                    >
                      {program.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {program.category}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{program.track}</td>
                  <td className="px-4 py-3 text-text-muted">
                    {program.state ?? "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={program.status} />
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {new Date(program.updated_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {programs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-text-muted"
                  >
                    No programs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "active"
      ? "success"
      : status === "draft"
        ? "default"
        : "warning";
  return <Badge variant={variant}>{status}</Badge>;
}
