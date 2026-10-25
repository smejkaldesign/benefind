"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type FormEvent,
} from "react";
import {
  getCompanyScreeningSteps,
  answersToCompanyInput,
} from "@/lib/screening/company-steps";
import { runCompanyScreening } from "@/lib/benefits/company-engine";
import { ENGINE_VERSION } from "@/lib/benefits/types";
import type { CompanyScreeningResult } from "@/lib/benefits/company-types";
import { totalEstimatedAnnualValue } from "@/lib/benefits/company-types";
import { persistCompanyScreening } from "../actions";
import {
  ChatMessage,
  TypingIndicator,
} from "@/components/screening/chat-message";
import { StepInput } from "@/components/screening/step-input";
import {
  InlineOptions,
  hasInlineOptions,
} from "@/components/screening/inline-options";
import { Grainient } from "@/components/grainient";
import Image from "next/image";
import { STORAGE_KEYS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  RotateCcw,
  Building2,
  Search,
  CheckCircle2,
  Lock,
  Mail,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { US_STATES } from "@/lib/screening/us-states";
import { getAppOrigin } from "@/lib/app-url";
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";
import { localizeCompanyProgram } from "@/lib/i18n/localize-company-program";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  helpText?: string;
}

const SIGNUP_RESEND_COOLDOWN_SECONDS = 60;

export default function CompanyScreeningPage() {
  const { t } = useI18n();
  const c = t.company;
  const steps = useMemo(() => getCompanyScreeningSteps(t), [t]);
  const stepsPreview = [
    {
      icon: Building2,
      label: c.panel.step1Label,
      desc: c.panel.step1Desc,
    },
    { icon: Search, label: c.panel.step2Label, desc: c.panel.step2Desc },
    {
      icon: CheckCircle2,
      label: c.panel.step3Label,
      desc: c.panel.step3Desc,
    },
  ];
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [result, setResult] = useState<CompanyScreeningResult | null>(null);
  const [showSignupGate, setShowSignupGate] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupSent, setSignupSent] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupCooldownEnd, setSignupCooldownEnd] = useState<number | null>(
    null,
  );
  const [signupCooldown, setSignupCooldown] = useState(0);
  const signupCooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const [showResults, setShowResults] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const router = useRouter();

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }, []);

  const addMessage = useCallback(
    (role: "assistant" | "user", content: string, helpText?: string) => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role, content, helpText },
      ]);
      scrollToBottom();
    },
    [scrollToBottom],
  );

  const showStep = useCallback(
    (stepIndex: number) => {
      const step = steps[stepIndex];
      if (!step) return;

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage("assistant", step.question, step.helpText);
      }, 600);
    },
    [addMessage, steps],
  );

  // Resend-link cooldown countdown
  useEffect(() => {
    if (!signupCooldownEnd) {
      setSignupCooldown(0);
      return;
    }

    // Capture in a local const so the closure holds a non-null number, not
    // the (number | null) state that React might update underneath us.
    const end = signupCooldownEnd;

    function tick() {
      const remaining = Math.ceil((end - Date.now()) / 1000);
      if (remaining <= 0) {
        setSignupCooldown(0);
        setSignupCooldownEnd(null);
        if (signupCooldownTimerRef.current) {
          clearInterval(signupCooldownTimerRef.current);
          signupCooldownTimerRef.current = null;
        }
      } else {
        setSignupCooldown(remaining);
      }
    }

    tick();
    signupCooldownTimerRef.current = setInterval(tick, 1000);

    return () => {
      if (signupCooldownTimerRef.current) {
        clearInterval(signupCooldownTimerRef.current);
        signupCooldownTimerRef.current = null;
      }
    };
  }, [signupCooldownEnd]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    addMessage("assistant", c.chat.welcome);
    setTimeout(() => {
      addMessage("assistant", c.chat.privacy);
      setTimeout(() => showStep(0), 400);
    }, 800);
  }, [addMessage, showStep, c]);

  function handleAnswer(value: string) {
    const step = steps[currentStep];
    if (!step) return;

    let displayValue = value;
    if (step.type === "select" || step.type === "state") {
      const opt = step.options?.find((o) => o.value === value);
      displayValue = opt?.label ?? value;
      if (step.type === "state") {
        const state = US_STATES.find((s) => s.value === value);
        displayValue = state?.label ?? value;
      }
    }
    if (step.type === "multi-select") {
      const labels = value
        .split(",")
        .map((v) => step.options?.find((o) => o.value === v)?.label ?? v);
      displayValue = labels.join(", ");
    }

    addMessage("user", displayValue);

    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    let nextStep = currentStep + 1;

    // Skip R&D percentage if no R&D
    if (
      steps[nextStep]?.id === "rndPercentage" &&
      newAnswers.hasRnd !== "yes"
    ) {
      nextStep++;
    }

    if (nextStep >= steps.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage("assistant", c.chat.calculating);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const input = answersToCompanyInput(newAnswers);
          const screeningResult = runCompanyScreening(input);
          setResult(screeningResult);
          try {
            const { input: _pii, ...safeResult } = screeningResult;
            sessionStorage.setItem(
              STORAGE_KEYS.COMPANY_SCREENING_RESULT,
              JSON.stringify(safeResult),
            );
            // Store answers separately for post-signup persistence
            sessionStorage.setItem(
              STORAGE_KEYS.COMPANY_SCREENING_ANSWERS,
              JSON.stringify(newAnswers),
            );
          } catch {}

          // Persist to database if authenticated (fire-and-forget)
          persistCompanyScreening({
            answers: newAnswers,
            engineVersion: ENGINE_VERSION,
            companyName: input.companyName,
            state: input.state,
            industry: input.industry,
            companyAge: input.companyAge,
            employeeCount: input.employeeCount,
            annualRevenue: input.annualRevenue,
            hasRnd: input.hasRnd,
            rndPercentage: input.rndPercentage,
            ownershipDemographics: input.ownershipDemographics,
            isRural: input.isRural,
            exportsOrPlans: input.exportsOrPlans,
            isHiring: input.isHiring,
            hasCleanEnergy: input.hasCleanEnergy,
            results: screeningResult.programs.map((p) => ({
              programId: p.program.id,
              confidenceScore: p.result.matchScore,
              eligible: p.result.eligible,
              estimatedValue: p.result.estimatedValue ?? null,
              reasons: {
                reason: p.result.reason,
                whyYouQualify: p.result.whyYouQualify,
                nextSteps: p.result.nextSteps,
              },
            })),
          }).catch(() => {
            // Non-blocking: screening works client-only if persistence fails
          });

          const eligible = screeningResult.programs.filter(
            (p) => p.result.eligible,
          );
          if (eligible.length > 0) {
            addMessage(
              "assistant",
              fmt(eligible.length === 1 ? c.chat.foundOne : c.chat.foundOther, {
                count: eligible.length,
                company: input.companyName,
              }),
            );
            setTimeout(() => {
              addMessage("assistant", c.chat.signupPrompt);
              setShowSignupGate(true);
              scrollToBottom();
            }, 400);
          } else {
            addMessage("assistant", c.chat.noMatches);
            setShowResults(true);
          }
        }, 1500);
      }, 600);
    } else {
      setCurrentStep(nextStep);
      showStep(nextStep);
    }
  }

  async function sendSignupLink() {
    setSignupError(null);
    setSignupLoading(true);

    const supabase = createClient();
    // Include ?next so callback redirects to dashboard with from=company-screening
    const { error } = await supabase.auth.signInWithOtp({
      email: signupEmail,
      options: {
        emailRedirectTo: `${getAppOrigin()}/auth/callback?next=${encodeURIComponent("/dashboard?from=company-screening")}`,
      },
    });

    if (error) {
      setSignupError(
        error.message.charAt(0).toUpperCase() + error.message.slice(1),
      );
      setSignupLoading(false);
      return;
    }

    setSignupSent(true);
    setSignupLoading(false);
    setSignupCooldownEnd(Date.now() + SIGNUP_RESEND_COOLDOWN_SECONDS * 1000);
  }

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    await sendSignupLink();
  }

  async function handleResendSignupLink() {
    if (signupCooldown > 0 || signupLoading) return;
    await sendSignupLink();
  }

  function handleSkipSignup() {
    setShowSignupGate(false);
    setShowResults(true);
    scrollToBottom();
  }

  function handleRestart() {
    setMessages([]);
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setShowSignupGate(false);
    setShowResults(false);
    setSignupEmail("");
    setSignupSent(false);
    setSignupError(null);
    setSignupCooldownEnd(null);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.COMPANY_SCREENING_RESULT);
      sessionStorage.removeItem(STORAGE_KEYS.COMPANY_SCREENING_ANSWERS);
    } catch {}
    initialized.current = false;
    setTimeout(() => {
      initialized.current = true;
      addMessage("assistant", c.chat.restartMessage);
      setTimeout(() => showStep(0), 400);
    }, 100);
  }

  const currentStepData = steps[currentStep];
  const progress = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="flex h-[calc(100dvh-var(--ai-banner-h))] overflow-hidden bg-surface text-text">
      {/* ── Left panel: conversation ──────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden lg:max-w-[55%]">
        {/* Header */}
        <header className="shrink-0 border-b border-border bg-surface/80 backdrop-blur-[30px]">
          <div className="flex h-16 items-center gap-3 px-6">
            <Link
              href="/get-started"
              aria-label={t.common.back}
              className="text-text-subtle hover:text-text transition-colors"
            >
              <ArrowLeft className="h-5 w-5 rtl:-scale-x-100" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold text-text">
                  {c.chat.title}
                </h1>
                {result && (
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1 text-xs text-text-subtle hover:text-brand transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {c.chat.restart}
                  </button>
                )}
              </div>
              <div
                className="mt-1.5 h-1 w-full rounded-full bg-surface-bright"
                role="progressbar"
                aria-valuenow={result ? 100 : progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={c.chat.progressLabel}
              >
                <div
                  className="h-full rounded-full bg-brand transition-all duration-500"
                  style={{ width: `${result ? 100 : progress}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-scroll"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="flex min-h-full flex-col justify-end px-6 py-6">
            <div className="mx-auto w-full max-w-xl">
              <div
                className="space-y-3"
                role="log"
                aria-live="polite"
                aria-label={c.chat.conversationLabel}
              >
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    role={msg.role}
                    helpText={msg.helpText}
                  >
                    {msg.content}
                  </ChatMessage>
                ))}
                {isTyping && (
                  <ChatMessage role="assistant">
                    <TypingIndicator />
                  </ChatMessage>
                )}
                {!result &&
                  !isTyping &&
                  currentStepData &&
                  hasInlineOptions(currentStepData) && (
                    <InlineOptions
                      step={currentStepData}
                      onSubmit={handleAnswer}
                    />
                  )}
                {showSignupGate && !showResults && (
                  <div className="mt-4">
                    <ChatMessage role="assistant">
                      {signupSent ? (
                        <div className="space-y-3 text-center py-2">
                          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand/15">
                            <CheckCircle2 className="h-5 w-5 text-brand" />
                          </div>
                          <p className="text-sm font-medium text-text">
                            {c.chat.checkEmail}
                          </p>
                          <p className="text-xs text-text-muted">
                            {c.chat.sentTo}{" "}
                            <strong className="text-text">{signupEmail}</strong>
                          </p>
                          {signupError && (
                            <p
                              className="rounded-lg bg-error/10 px-3 py-2 text-xs font-medium text-error"
                              role="alert"
                            >
                              {signupError}
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={handleResendSignupLink}
                            disabled={signupLoading || signupCooldown > 0}
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-brand transition-colors hover:text-brand-dark disabled:cursor-not-allowed disabled:text-text-subtle"
                          >
                            {signupLoading ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                {c.chat.sending}
                              </>
                            ) : signupCooldown > 0 ? (
                              <span className="tabular-nums">
                                {fmt(c.chat.resendIn, {
                                  seconds: signupCooldown,
                                })}
                              </span>
                            ) : (
                              c.chat.resendLink
                            )}
                          </button>
                        </div>
                      ) : (
                        <form
                          onSubmit={handleSignup}
                          className="space-y-3 py-1"
                        >
                          <div className="relative">
                            <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                            <input
                              type="email"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              required
                              placeholder={c.chat.emailPlaceholder}
                              aria-label={c.chat.emailLabel}
                              dir="ltr"
                              disabled={signupLoading}
                              className="block h-11 w-full rounded-lg border border-border bg-surface-dim ps-10 pe-3 text-sm text-text transition-colors placeholder:text-text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none disabled:opacity-50"
                            />
                          </div>
                          {signupError && (
                            <p
                              className="rounded-lg bg-error/10 px-3 py-2 text-xs font-medium text-error"
                              role="alert"
                            >
                              {signupError}
                            </p>
                          )}
                          <button
                            type="submit"
                            disabled={signupLoading || !signupEmail}
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-stone-900 transition-colors hover:bg-brand-dark disabled:opacity-50"
                          >
                            {signupLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {c.chat.sendingLink}
                              </>
                            ) : (
                              c.chat.createAccount
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handleSkipSignup}
                            className="block w-full text-center text-xs text-text-muted hover:text-brand transition-colors"
                          >
                            {c.chat.skipForNow}
                          </button>
                        </form>
                      )}
                    </ChatMessage>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom input */}
        {!result && !showSignupGate && currentStepData && (
          <div className="sticky bottom-0 border-t border-border bg-surface/80 px-6 py-4 backdrop-blur-[30px]">
            <div className="mx-auto max-w-xl">
              <StepInput
                step={currentStepData}
                onSubmit={handleAnswer}
                isSecondary={hasInlineOptions(currentStepData)}
                disabled={isTyping}
              />
            </div>
          </div>
        )}

        {/* Results summary */}
        {result && showResults && (
          <div className="border-t border-border bg-surface-dim px-6 py-6">
            <div className="mx-auto max-w-xl space-y-4">
              <div className="rounded-[16px] border border-brand/30 bg-brand/5 p-5 text-center space-y-2">
                <p className="font-display text-4xl font-semibold text-brand">
                  ${totalEstimatedAnnualValue(result.programs).toLocaleString()}
                  <span className="text-base font-normal text-text-muted">
                    {" "}
                    {c.chat.perYear}
                  </span>
                </p>
                <p className="text-sm text-text-muted">
                  {fmt(
                    result.totalMatched === 1
                      ? c.chat.estimatedAcrossOne
                      : c.chat.estimatedAcrossOther,
                    { count: result.totalMatched },
                  )}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {result.programs
                    .filter((p) => p.result.eligible)
                    .slice(0, 5)
                    .map(({ program }) => (
                      <span
                        key={program.id}
                        className="rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-medium text-brand"
                      >
                        {localizeCompanyProgram(program, t).shortName}
                      </span>
                    ))}
                  {result.totalMatched > 5 && (
                    <span className="rounded-full bg-surface-bright px-2.5 py-0.5 text-xs font-medium text-text-muted">
                      {fmt(c.chat.more, { count: result.totalMatched - 5 })}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-subtle pt-1">
                  {c.chat.preliminary}
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => router.push("/results/company")}
                  className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                >
                  {t.screening.viewResults}
                </button>
                <button
                  onClick={handleRestart}
                  className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-muted transition-colors hover:border-brand hover:text-brand"
                >
                  {t.common.startOver}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Right panel: Grainient + value prop ─────────────── */}
      <div className="hidden lg:flex lg:flex-1 relative border-s border-border overflow-hidden h-full">
        <div className="absolute inset-0">
          <Grainient
            color1="#FF9FFC"
            color2="#5227FF"
            color3="#B19EEF"
            timeSpeed={0.25}
            rotationAmount={120}
            centerY={-0.25}
            colorBalance={0.15}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,10,40,0.55) 0%, rgba(20,10,40,0.25) 50%, rgba(20,10,40,0.55) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 xl:px-16">
          <div className="mb-10">
            <Image
              src="/images/brand/logo-light.svg"
              alt="Benefind"
              width={120}
              height={22}
              priority
            />
            <p className="mt-2 text-sm text-white/70">{c.panel.tagline}</p>
          </div>

          <h2 className="font-display text-3xl font-semibold tracking-tight text-white xl:text-4xl">
            {c.panel.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 max-w-xs">
            {c.panel.intro}
          </p>

          <div className="mt-10 space-y-7">
            {stepsPreview.map(({ icon: Icon, label, desc }, i) => (
              <div key={label} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/15 backdrop-blur-sm mt-0.5">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                    {fmt(c.panel.step, { n: i + 1 })}
                  </span>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-0.5 text-sm text-white/70 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-start gap-3 rounded-[16px] border border-white/20 bg-white/10 px-4 py-3.5 backdrop-blur-md">
            <Lock className="h-4 w-4 text-white/80 mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed text-white/80">
              {c.panel.privacyNote}
            </p>
          </div>

          <p className="mt-6 text-xs text-white/60">
            {c.panel.scansPrefix}{" "}
            <span className="font-semibold text-white/90">
              {c.panel.scansHighlight}
            </span>{" "}
            {c.panel.scansSuffix}
          </p>
        </div>
      </div>
    </div>
  );
}
