import { requireAuth } from "@/components/auth-guard";
import { createServerSupabase } from "@/lib/supabase/server";
import { getScreeningWithResults } from "@/lib/db/screenings";
import { listWorkspacesForUser } from "@/lib/db/workspaces";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  CircleDot,
  HelpCircle,
  CircleSlash,
  XCircle,
  Clock,
  Cpu,
  Users,
  MapPin,
} from "lucide-react";

const TIER_META: Record<
  string,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
    badgeVariant: "success" | "warning" | "default";
    accentClass: string;
  }
> = {
  eligible_with_requirements: {
    label: "Eligible",
    icon: CheckCircle2,
    iconClass: "text-success",
    badgeVariant: "success",
    accentClass: "border-l-4 border-success",
  },
  probably_eligible: {
    label: "Probably Eligible",
    icon: CircleDot,
    iconClass: "text-success",
    badgeVariant: "success",
    accentClass: "border-l-4 border-dashed border-success",
  },
  maybe_eligible: {
    label: "Maybe Eligible",
    icon: HelpCircle,
    iconClass: "text-warning",
    badgeVariant: "warning",
    accentClass: "border-l-4 border-warning",
  },
  not_likely: {
    label: "Unlikely",
    icon: CircleSlash,
    iconClass: "text-text-muted",
    badgeVariant: "default",
    accentClass: "border-l-4 border-border",
  },
  ineligible: {
    label: "Not Eligible",
    icon: XCircle,
    iconClass: "text-text-subtle",
    badgeVariant: "default",
    accentClass: "border-l-4 border-border-dark",
  },
};

export default async function ScreeningDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAuth();
  const { id } = await params;
  const supabase = await createServerSupabase();

  const cookieStore = await cookies();
  const workspaceId = cookieStore.get("bf-workspace")?.value;

  if (!workspaceId) {
    notFound();
  }

  // SECURITY: verify the user is actually a member of this workspace.
  // The cookie is set client-side and could be forged.
  const { data: memberships } = await listWorkspacesForUser(supabase, user.id);
  const isMember =
    memberships?.some((m) => m.workspace_id === workspaceId) ?? false;
  if (!isMember) {
    notFound();
  }

  const { data: screening, error } = await getScreeningWithResults(
    supabase,
    id,
  );

  if (error || !screening) {
    notFound();
  }

  // Verify the screening belongs to the user's workspace
  if (screening.workspace_id !== workspaceId) {
    notFound();
  }

  const results: Array<{
    id: string;
    program_id: string;
    confidence_score: number;
    eligibility_tier: string;
    estimated_value: string | null;
    reasons: unknown;
  }> = screening.screening_results ?? [];
  const pursuable = results.filter(
    (r) =>
      r.eligibility_tier === "eligible_with_requirements" ||
      r.eligibility_tier === "probably_eligible",
  );
  const maybe = results.filter((r) => r.eligibility_tier === "maybe_eligible");
  const unlikely = results.filter(
    (r) =>
      r.eligibility_tier === "not_likely" ||
      r.eligibility_tier === "ineligible",
  );

  const formattedDate = new Date(screening.created_at).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="space-y-6">
      {/* Back link + header */}
      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Dashboard
        </Link>

        <PageHeader title="Screening Results" description={formattedDate}>
          <Link href="/screening?prefill=latest">
            <Button variant="secondary" size="default">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Re-screen
            </Button>
          </Link>
        </PageHeader>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-3">
        {screening.state && (
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-dim px-3 py-1.5 text-sm text-text-muted">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {screening.state}
          </div>
        )}
        {screening.household_size && (
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-dim px-3 py-1.5 text-sm text-text-muted">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {screening.household_size} person household
          </div>
        )}
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-dim px-3 py-1.5 text-sm text-text-muted">
          <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
          Engine v{screening.engine_version}
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-dim px-3 py-1.5 text-sm text-text-muted">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {new Date(screening.created_at).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </div>
        {screening.is_latest && (
          <Badge variant="success" className="text-xs">
            Latest
          </Badge>
        )}
      </div>

      {/* Summary card */}
      {pursuable.length > 0 && (
        <Card className="space-y-3 bg-brand/5 border-brand/30">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-brand" aria-hidden="true" />
            <h2 className="font-semibold text-text">
              {pursuable.length} program{pursuable.length !== 1 ? "s" : ""} you
              likely qualify for
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {pursuable.map((r) => (
              <span
                key={r.id}
                className="rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-medium text-brand"
              >
                {r.program_id}
                {r.estimated_value ? ` (${r.estimated_value})` : ""}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Pursuable results */}
      {pursuable.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
            Eligible Programs
          </h2>
          {pursuable.map((r) => (
            <ResultCard key={r.id} result={r} />
          ))}
        </section>
      )}

      {/* Maybe eligible */}
      {maybe.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
            Maybe Eligible ({maybe.length})
          </h2>
          {maybe.map((r) => (
            <ResultCard key={r.id} result={r} />
          ))}
        </section>
      )}

      {/* Unlikely */}
      {unlikely.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
            Not Currently Eligible ({unlikely.length})
          </h2>
          {unlikely.map((r) => (
            <ResultCard key={r.id} result={r} compact />
          ))}
        </section>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-text-subtle text-center pt-4">
        These results are estimates based on the information you provided.
        Actual eligibility is determined by each program&apos;s administering
        agency.
      </p>
    </div>
  );
}

function ResultCard({
  result,
  compact = false,
}: {
  result: {
    id: string;
    program_id: string;
    confidence_score: number;
    eligibility_tier: string;
    estimated_value: string | null;
    reasons: unknown;
  };
  compact?: boolean;
}) {
  const tier = TIER_META[result.eligibility_tier] ?? TIER_META.not_likely!;
  const TierIcon = tier.icon;

  return (
    <Card className={`space-y-2 ${tier.accentClass}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TierIcon
            className={`h-4 w-4 ${tier.iconClass}`}
            aria-hidden="true"
          />
          <h3 className="font-semibold text-text">{result.program_id}</h3>
        </div>
        <div className="flex items-center gap-2">
          {result.estimated_value && (
            <span className="text-xs text-text-muted">
              {result.estimated_value}
            </span>
          )}
          <Badge variant={tier.badgeVariant} className="text-xs">
            {tier.label}
          </Badge>
        </div>
      </div>

      {!compact && (
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>Confidence: {result.confidence_score}/100</span>
        </div>
      )}
    </Card>
  );
}
