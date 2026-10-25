import { Suspense } from "react";
import { requireAuth } from "@/components/auth-guard";
import { createServerSupabase } from "@/lib/supabase/server";
import { listWorkspacesForUser } from "@/lib/db/workspaces";
import { getLatestScreening, listScreenings } from "@/lib/db/screenings";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PersistScreeningOnMount } from "@/components/screening/persist-on-mount";
import { EmailAlertsToggle } from "@/components/dashboard/email-alerts-toggle";
import { PremiumGate } from "@/components/premium-gate";
import { CompanyMatchList } from "@/components/company/company-match-list";
import { getWorkspaceAccess } from "@/lib/billing/workspace-access";
import { getEntitlements } from "@/lib/billing/entitlements";
import { toCompanyMatchViews } from "@/lib/billing/company-matches";
import { runCompanyScreening } from "@/lib/benefits/company-engine";
import { answersToCompanyInput } from "@/lib/screening/company-steps";
import {
  localizeCompanyProgram,
  localizeCompanyResult,
} from "@/lib/i18n/localize-company-program";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  ArrowRight,
  FileSearch,
  Clock,
  ClipboardList,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { getServerI18n } from "@/lib/i18n/server";
import { fmt } from "@/lib/i18n/format";
import { localizeProgram } from "@/lib/i18n/localize-program";
import { getProgram } from "@/lib/benefits/engine";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

type TierKey = keyof Dictionary["app"]["dashboard"]["tiers"];

const TIER_LABELS: Record<
  string,
  { key: TierKey; variant: "success" | "warning" | "default" }
> = {
  eligible_with_requirements: { key: "eligible", variant: "success" },
  probably_eligible: { key: "probably", variant: "success" },
  maybe_eligible: { key: "maybe", variant: "warning" },
  not_likely: { key: "unlikely", variant: "default" },
  ineligible: { key: "no", variant: "default" },
};

function programName(programId: string, t: Dictionary): string {
  const program = getProgram(programId);
  return program ? localizeProgram(program, t).name : programId;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function DashboardPage() {
  const user = await requireAuth();
  const supabase = await createServerSupabase();
  const { t, locale } = await getServerI18n();

  // Read workspace from cookie and verify membership (defense-in-depth)
  const cookieStore = await cookies();
  const rawWorkspaceId = cookieStore.get("bf-workspace")?.value;

  // Validate UUID format before using in any query
  const workspaceId =
    rawWorkspaceId && UUID_RE.test(rawWorkspaceId) ? rawWorkspaceId : undefined;

  if (workspaceId) {
    let isMember = false;
    try {
      const { data: memberships } = await listWorkspacesForUser(
        supabase,
        user.id,
      );
      isMember =
        memberships?.some((m) => m.workspace_id === workspaceId) ?? false;
    } catch {
      // DB failure should not crash the page; treat as non-member
    }
    if (!isMember) {
      return (
        <div className="space-y-6">
          <PageHeader
            title={t.app.dashboard.welcomeBack}
            description={t.app.dashboard.noAccess}
          />
          <EmptyState t={t} />
        </div>
      );
    }
  }

  if (!workspaceId) {
    return (
      <div className="space-y-6">
        {/* Post-signup: persist sessionStorage screening results to DB */}
        <Suspense fallback={null}>
          <PersistScreeningOnMount />
        </Suspense>
        <PageHeader
          title={t.app.dashboard.welcomeBack}
          description={user.email ?? undefined}
        />
        <EmptyState t={t} />
      </div>
    );
  }

  const access = await getWorkspaceAccess(supabase, user.id);
  const workspace =
    access?.workspace.id === workspaceId ? access.workspace : null;
  const entitlements = getEntitlements(workspace);

  if (workspace?.type === "company") {
    return (
      <div className="space-y-6">
        <Suspense fallback={null}>
          <PersistScreeningOnMount />
        </Suspense>
        <PageHeader
          title={t.app.dashboard.welcomeBack}
          description={user.email ?? undefined}
        />
        <CompanyMatchesSection
          workspaceId={workspaceId}
          showDetails={entitlements.companyProgramDetails}
          t={t}
        />
      </div>
    );
  }

  const { data: latest } = await getLatestScreening(supabase, workspaceId);
  // Free plans keep only the latest screening visible, so older rows are
  // not loaded at all.
  const { data: history } = entitlements.screeningHistory
    ? await listScreenings(supabase, workspaceId)
    : { data: null };

  return (
    <div className="space-y-6">
      {/* Post-signup: persist sessionStorage screening results to DB */}
      <Suspense fallback={null}>
        <PersistScreeningOnMount />
      </Suspense>

      <PageHeader
        title={t.app.dashboard.welcomeBack}
        description={user.email ?? undefined}
      />

      {latest ? (
        <>
          {/* Latest screening summary */}
          <LatestScreeningCard screening={latest} t={t} locale={locale} />

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3">
            {entitlements.rescreenPrefill ? (
              <Link href="/screening?prefill=latest">
                <Button variant="secondary" size="default">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  {t.app.dashboard.rescreen}
                </Button>
              </Link>
            ) : (
              <Link href="/screening">
                <Button variant="secondary" size="default">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  {t.plans.dashboard.newScreening}
                </Button>
              </Link>
            )}
            <Link href="/dashboard/documents">
              <Button variant="secondary" size="default">
                {t.app.dashboard.documents}
                <ArrowRight
                  className="h-4 w-4 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>

          <EmailAlertsToggle allowed={entitlements.newMatchAlerts} />

          {!entitlements.screeningHistory && (
            <PremiumGate allowed={false} feature="history" compact />
          )}

          {/* Screening history */}
          {history && history.length > 1 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold text-text-muted uppercase tracking-wide">
                {t.app.dashboard.screeningHistory}
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
                            {new Date(s.created_at).toLocaleDateString(locale, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              numberingSystem: "latn",
                            })}
                          </p>
                          <p className="text-xs text-text-muted">
                            {s.state ? `${s.state} · ` : ""}
                            {s.household_size
                              ? fmt(
                                  s.household_size === 1
                                    ? t.app.dashboard.householdOne
                                    : t.app.dashboard.householdOther,
                                  { count: s.household_size },
                                )
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {s.is_latest && (
                          <Badge variant="success" className="text-xs">
                            {t.app.dashboard.latest}
                          </Badge>
                        )}
                        <ArrowRight
                          className="h-4 w-4 text-text-subtle group-hover:text-brand transition-colors rtl:-scale-x-100"
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
        <EmptyState t={t} />
      )}
    </div>
  );
}

async function CompanyMatchesSection({
  workspaceId,
  showDetails,
  t,
}: {
  workspaceId: string;
  showDetails: boolean;
  t: Dictionary;
}) {
  const supabase = await createServerSupabase();
  const { data: profile } = await supabase
    .from("company_profiles")
    .select("scan_data")
    .eq("workspace_id", workspaceId)
    .is("deleted_at", null)
    .maybeSingle();

  const answers = profile?.scan_data;
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return (
      <Card className="text-center">
        <FileSearch
          className="mx-auto h-10 w-10 text-text-subtle"
          aria-hidden="true"
        />
        <p className="mt-4 text-sm text-text-muted">
          {t.plans.dashboard.companyNoProfile}
        </p>
        <div className="mt-4">
          <Link href="/screening/company">
            <Button size="default">
              {t.plans.dashboard.companyStart}
              <ArrowRight
                className="h-4 w-4 rtl:-scale-x-100"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  // The engine runs on the server so program details are only sent to the
  // browser when the workspace is on the Business plan.
  const result = runCompanyScreening(
    answersToCompanyInput(answers as Record<string, string>),
  );
  const matches = toCompanyMatchViews(
    result.programs.map((p) => ({
      program: localizeCompanyProgram(p.program, t),
      result: localizeCompanyResult(p.result, t),
    })),
    showDetails,
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
          {t.plans.dashboard.companyMatchesTitle} ({matches.length})
        </h2>
        <Link href="/screening/company">
          <Button variant="secondary" size="default">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t.company.results.updateInfo}
          </Button>
        </Link>
      </div>
      <CompanyMatchList matches={matches} signedIn />
    </section>
  );
}

function EmptyState({ t }: { t: Dictionary }) {
  return (
    <Card className="text-center">
      <FileSearch
        className="mx-auto h-10 w-10 text-text-subtle"
        aria-hidden="true"
      />
      <h2 className="mt-4 font-semibold text-text">
        {t.app.dashboard.noScreeningsTitle}
      </h2>
      <p className="mt-2 text-sm text-text-muted">
        {t.app.dashboard.noScreeningsBody}
      </p>
      <div className="mt-4">
        <Link href="/screening">
          <Button size="default">
            {t.app.dashboard.startScreening}
            <ArrowRight
              className="h-4 w-4 rtl:-scale-x-100"
              aria-hidden="true"
            />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function LatestScreeningCard({
  screening,
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
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
            <ClipboardList className="h-5 w-5 text-brand" aria-hidden="true" />
            <h2 className="font-semibold text-text">
              {t.app.dashboard.latestScreening}
            </h2>
          </div>
          <p className="mt-1 text-xs text-text-muted">
            {new Date(screening.created_at).toLocaleDateString(locale, {
              month: "long",
              day: "numeric",
              year: "numeric",
              numberingSystem: "latn",
            })}
            {screening.state ? ` · ${screening.state}` : ""}
          </p>
        </div>
        <Badge variant="success" className="text-xs">
          <CheckCircle2 className="me-1 h-3 w-3" aria-hidden="true" />
          {fmt(
            eligible.length === 1
              ? t.app.dashboard.programsOne
              : t.app.dashboard.programsOther,
            { count: eligible.length },
          )}
        </Badge>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.slice(0, 5).map((r) => {
            const tier = TIER_LABELS[r.eligibility_tier];
            const tierInfo = tier
              ? {
                  label: t.app.dashboard.tiers[tier.key],
                  variant: tier.variant,
                }
              : { label: r.eligibility_tier, variant: "secondary" as const };
            return (
              <div
                key={r.program_id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-text">
                  {programName(r.program_id, t)}
                </span>
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
              {fmt(
                results.length - 5 === 1
                  ? t.app.dashboard.moreProgramsOne
                  : t.app.dashboard.moreProgramsOther,
                { count: results.length - 5 },
              )}
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
