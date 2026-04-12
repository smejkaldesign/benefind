import { requireAuth } from "@/components/auth-guard";
import { createServerSupabase } from "@/lib/supabase/server";
import { getLatestScreening, listScreenings } from "@/lib/db/screenings";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  ArrowRight,
  FileSearch,
  Clock,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

const TIER_LABELS: Record<
  string,
  { label: string; variant: "success" | "warning" | "default" }
> = {
  eligible_with_requirements: { label: "Eligible", variant: "success" },
  probably_eligible: { label: "Probably", variant: "success" },
  maybe_eligible: { label: "Maybe", variant: "warning" },
  not_likely: { label: "Unlikely", variant: "default" },
  ineligible: { label: "No", variant: "default" },
};

export default async function DashboardPage() {
  const user = await requireAuth();
  const supabase = await createServerSupabase();

  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("bf-workspace")?.value;

  if (!workspaceId) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Welcome back"
          description={user.email ?? undefined}
        />
        <EmptyState />
      </div>
    );
  }

  const { data: latest } = await getLatestScreening(supabase, workspaceId);
  const { data: history } = await listScreenings(supabase, workspaceId);

  return (
    <div className="space-y-6">
      <PageHeader title="Welcome back" description={user.email ?? undefined} />

      {latest ? (
        <>
          {/* Latest screening summary */}
          <LatestScreeningCard screening={latest} />

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3">
            <Link href="/screening?prefill=latest">
              <Button variant="secondary" size="default">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Re-screen
              </Button>
            </Link>
            <Link href="/screening">
              <Button variant="secondary" size="default">
                New Screening
              </Button>
            </Link>
            <Link href="/dashboard/documents">
              <Button variant="secondary" size="default">
                Documents
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          {/* Screening history */}
          {history && history.length > 1 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold text-text-muted uppercase tracking-wide">
                Screening History
              </h2>
              <div className="space-y-2">
                {history.map((s) => (
                  <Link
                    key={s.id}
                    href={`/dashboard/screenings/${s.id}`}
                    className="group block"
                  >
                    <div className="flex items-center justify-between rounded-lg border border-border bg-surface-dim p-3 transition-colors hover:border-brand/40 hover:bg-surface-bright">
                      <div className="flex items-center gap-3">
                        <Clock
                          className="h-4 w-4 text-text-subtle"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm font-medium text-text">
                            {new Date(s.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                          <p className="text-xs text-text-muted">
                            {s.state ? `${s.state} · ` : ""}
                            {s.household_size
                              ? `${s.household_size} person household`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {s.is_latest && (
                          <Badge variant="success" className="text-xs">
                            Latest
                          </Badge>
                        )}
                        <ArrowRight
                          className="h-4 w-4 text-text-subtle group-hover:text-brand transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="text-center">
      <FileSearch
        className="mx-auto h-10 w-10 text-text-subtle"
        aria-hidden="true"
      />
      <h2 className="mt-4 font-semibold text-text">No screenings yet</h2>
      <p className="mt-2 text-sm text-text-muted">
        Start a screening to discover benefits you qualify for.
      </p>
      <div className="mt-4">
        <Link href="/screening">
          <Button size="default">
            Start Screening
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function LatestScreeningCard({
  screening,
}: {
  screening: {
    id: string;
    created_at: string;
    state: string | null;
    household_size: number | null;
    engine_version: string;
    screening_results: Array<{
      program_id: string;
      confidence_score: number;
      eligibility_tier: string;
      estimated_value: string | null;
    }>;
  };
}) {
  const results = screening.screening_results ?? [];
  const eligible = results.filter(
    (r) =>
      r.eligibility_tier === "eligible_with_requirements" ||
      r.eligibility_tier === "probably_eligible",
  );

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand" aria-hidden="true" />
            <h2 className="font-semibold text-text">Latest Screening</h2>
          </div>
          <p className="mt-1 text-xs text-text-muted">
            {new Date(screening.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {screening.state ? ` · ${screening.state}` : ""}
          </p>
        </div>
        <Badge variant="success" className="text-xs">
          <CheckCircle2 className="mr-1 h-3 w-3" aria-hidden="true" />
          {eligible.length} program{eligible.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.slice(0, 5).map((r) => {
            const tierInfo = TIER_LABELS[r.eligibility_tier] ?? {
              label: r.eligibility_tier,
              variant: "secondary",
            };
            return (
              <div
                key={r.program_id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-text">{r.program_id}</span>
                <div className="flex items-center gap-2">
                  {r.estimated_value && (
                    <span className="text-xs text-text-muted">
                      {r.estimated_value}
                    </span>
                  )}
                  <Badge variant={tierInfo.variant} className="text-xs">
                    {tierInfo.label}
                  </Badge>
                </div>
              </div>
            );
          })}
          {results.length > 5 && (
            <p className="text-xs text-text-muted">
              +{results.length - 5} more programs
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
