"use client";

import {
  Suspense,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  getScreeningSteps,
  answersToScreeningInput,
} from "@/lib/screening/steps";
import { runScreening } from "@/lib/benefits/engine";
import { PURSUABLE_TIERS, ENGINE_VERSION } from "@/lib/benefits/types";
import type { ScreeningResult } from "@/lib/benefits/types";
import { summarizeEligible } from "@/lib/screening/summarize";
import { persistScreening, getLatestAnswers } from "./actions";
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
import { createClient } from "@/lib/supabase/client";
import { STORAGE_KEYS } from "@/lib/constants";
import {
  ArrowLeft,
  RotateCcw,
  MessageSquare,
  Zap,
  CheckCircle2,
  Lock,
  Mail,
  Loader2,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { US_STATES } from "@/lib/screening/us-states";
import { getAppOrigin } from "@/lib/app-url";
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";
import { localizeProgram } from "@/lib/i18n/localize-program";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  helpText?: string;
}

const SIGNUP_RESEND_COOLDOWN_SECONDS = 60;

/** Splits a template around a `{slot}` placeholder so JSX can fill it. */
function withSlot(template: string, slot: string, node: React.ReactNode) {
  const [before, after] = template.split(`{${slot}}`);
  return (
    <>
      {before}
      {node}
      {after}
    </>
  );
}

export default function ScreeningPage() {
  return (
    <Suspense fallback={null}>
      <ScreeningPageInner />
    </Suspense>
  );
}

function ScreeningPageInner() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [showSignupGate, setShowSignupGate] = useState(false);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);
  const [signupMode, setSignupMode] = useState<"create" | "signin">("create");
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
  const [prefillLoaded, setPrefillLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const m = t.screeningFlow;
  const screeningSteps = useMemo(() => getScreeningSteps(t), [t]);
  const stepsPreview = [
    { icon: MessageSquare, label: m.panel.step1Label, desc: m.panel.step1Desc },
    { icon: Zap, label: m.panel.step2Label, desc: m.panel.step2Desc },
    { icon: CheckCircle2, label: m.panel.step3Label, desc: m.panel.step3Desc },
  ];

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

  // Signed-in users skip the signup gate; their results save to their account
  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setSignedInEmail(data.user?.email ?? null));
  }, []);

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

  // Load previous answers when ?prefill=latest is set
  useEffect(() => {
    if (searchParams.get("prefill") !== "latest") {
      setPrefillLoaded(true);
      return;
    }
    getLatestAnswers()
      .then(({ answers: prev }) => {
        if (prev && Object.keys(prev).length > 0) {
          setAnswers(prev);
        }
        setPrefillLoaded(true);
      })
      .catch(() => {
        setPrefillLoaded(true);
      });
  }, [searchParams]);

  const showStep = useCallback(
    (stepIndex: number) => {
      const step = screeningSteps[stepIndex];
      if (!step) return;

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage("assistant", step.question, step.helpText);
      }, 600);
    },
    [addMessage, screeningSteps],
  );

  useEffect(() => {
    if (initialized.current || !prefillLoaded) return;
    initialized.current = true;

    const isPrefill =
      searchParams.get("prefill") === "latest" &&
      Object.keys(answers).length > 0;

    if (isPrefill) {
      addMessage("assistant", m.chat.welcomeBack);
      setTimeout(() => {
        addMessage("assistant", m.chat.prefilled);
        setTimeout(() => showStep(0), 400);
      }, 800);
    } else {
      addMessage("assistant", m.chat.welcome);
      setTimeout(() => {
        addMessage("assistant", m.chat.privacy);
        setTimeout(() => showStep(0), 400);
      }, 800);
    }
  }, [addMessage, showStep, prefillLoaded, searchParams, answers, m]);

  function handleAnswer(value: string) {
    const step = screeningSteps[currentStep];
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
    if (step.type === "number" && step.id !== "householdSize") {
      displayValue = `$${parseInt(value).toLocaleString()}`;
    }

    addMessage("user", displayValue);

    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    let nextStep = currentStep + 1;

    if (
      screeningSteps[nextStep]?.id === "childrenAges" &&
      newAnswers.hasChildren !== "yes"
    ) {
      nextStep++;
    }

    if (nextStep >= screeningSteps.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage("assistant", m.chat.calculating);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const input = answersToScreeningInput(newAnswers);
          const screeningResult = runScreening(input);
          setResult(screeningResult);
          try {
            const { input: _pii, ...safeResult } = screeningResult;
            sessionStorage.setItem(
              STORAGE_KEYS.SCREENING_RESULT,
              JSON.stringify(safeResult),
            );
            // Store answers separately for post-signup persistence
            sessionStorage.setItem(
              STORAGE_KEYS.SCREENING_ANSWERS,
              JSON.stringify(newAnswers),
            );
          } catch {}

          // Only signed-in answers go to the server. Signed-out answers stay
          // in sessionStorage until PersistScreeningOnMount saves them after
          // signup.
          const persisted = signedInEmail
            ? persistScreening({
                answers: newAnswers,
                engineVersion: ENGINE_VERSION,
                state: newAnswers.state,
                householdSize: parseInt(newAnswers.householdSize) || undefined,
                results: screeningResult.programs.map((p) => ({
                  programId: p.program.id,
                  confidenceScore: p.result.confidenceScore,
                  eligibilityTier: p.result.eligibilityTier,
                  estimatedValue: p.result.estimatedMonthlyValue
                    ? `$${p.result.estimatedMonthlyValue}/mo`
                    : null,
                  reasons: p.result.reasons as unknown as Record<
                    string,
                    unknown
                  >,
                })),
              }).catch(() => ({ screeningId: null }))
            : Promise.resolve({ screeningId: null });

          const eligible = screeningResult.programs.filter((p) =>
            PURSUABLE_TIERS.has(p.result.eligibilityTier),
          );
          if (eligible.length > 0) {
            addMessage(
              "assistant",
              summarizeEligible(
                eligible.map((p) => localizeProgram(p.program, t)),
                screeningResult.totalEstimatedAnnual,
                t,
              ),
            );
            if (signedInEmail) {
              persisted.then(({ screeningId }) => {
                addMessage(
                  "assistant",
                  screeningId
                    ? fmt(m.chat.saved, { email: signedInEmail })
                    : m.chat.saveFailed,
                );
                setShowResults(true);
              });
              return;
            }
            setTimeout(() => {
              addMessage("assistant", m.chat.signupEligible);
              setShowSignupGate(true);
              scrollToBottom();
            }, 400);
          } else {
            addMessage("assistant", m.chat.notEligible);
            if (signedInEmail) {
              persisted.then(({ screeningId }) => {
                addMessage(
                  "assistant",
                  screeningId
                    ? fmt(m.chat.savedRescreen, { email: signedInEmail })
                    : m.chat.saveFailed,
                );
                setShowResults(true);
              });
              return;
            }
            setTimeout(() => {
              addMessage("assistant", m.chat.signupNotEligible);
              setShowSignupGate(true);
              scrollToBottom();
            }, 400);
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
    // Include ?next so callback redirects to dashboard with from=screening
    const { error } = await supabase.auth.signInWithOtp({
      email: signupEmail,
      options: {
        emailRedirectTo: `${getAppOrigin()}/auth/callback?next=${encodeURIComponent("/dashboard?from=screening")}`,
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

  async function handleSignup(e: React.FormEvent) {
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
    initialized.current = false;
    setTimeout(() => {
      initialized.current = true;
      addMessage("assistant", m.chat.restart);
      setTimeout(() => showStep(0), 400);
    }, 100);
  }

  const currentStepData = screeningSteps[currentStep];
  const progress = Math.round((currentStep / screeningSteps.length) * 100);
  const pursuableCount =
    result?.programs.filter((p) =>
      PURSUABLE_TIERS.has(p.result.eligibilityTier),
    ).length ?? 0;

  return (
    <div className="flex h-[calc(100dvh-var(--ai-banner-h))] overflow-hidden bg-surface text-text">
      {/* ── Left panel: conversation ──────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden lg:max-w-[55%]">
        {/* Header */}
        <header className="shrink-0 border-b border-border bg-surface/80 backdrop-blur-[30px]">
          <div className="flex h-16 items-center gap-3 px-6">
            <Link
              href="/"
              className="text-text-subtle hover:text-text transition-colors"
              aria-label={m.header.backHome}
            >
              <ArrowLeft
                className="h-5 w-5 rtl:-scale-x-100"
                aria-hidden="true"
              />
            </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold text-text">
                  {m.header.title}
                </h1>
                {result && (
                  <button
                    onClick={handleRestart}
                    aria-label={m.header.restartAria}
                    className="flex items-center gap-1 text-xs text-text-subtle hover:text-brand transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    {m.header.restart}
                  </button>
                )}
              </div>
              <div
                className="mt-1.5 h-1 w-full rounded-full bg-surface-bright"
                role="progressbar"
                aria-valuenow={result ? 100 : progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={m.header.progressAria}
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
                aria-label={m.header.conversationAria}
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
                      defaultValue={answers[currentStepData.id]}
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
                            {m.signup.checkEmail}
                          </p>
                          <p className="text-xs text-text-muted">
                            {withSlot(
                              m.signup.sentTo,
                              "email",
                              <strong className="text-text">
                                {signupEmail}
                              </strong>,
                            )}
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
                                {m.signup.sending}
                              </>
                            ) : signupCooldown > 0 ? (
                              <span className="tabular-nums">
                                {fmt(m.signup.resendIn, {
                                  seconds: signupCooldown,
                                })}
                              </span>
                            ) : (
                              m.signup.resend
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
                              placeholder={m.signup.emailPlaceholder}
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
                                {m.signup.sendingLink}
                              </>
                            ) : signupMode === "signin" ? (
                              m.signup.sendSignin
                            ) : (
                              m.signup.createAccount
                            )}
                          </button>
                          <p className="text-center text-xs text-text-muted">
                            {signupMode === "signin"
                              ? m.signup.newHere
                              : m.signup.haveAccount}{" "}
                            <button
                              type="button"
                              onClick={() =>
                                setSignupMode((m) =>
                                  m === "signin" ? "create" : "signin",
                                )
                              }
                              className="font-semibold text-brand transition-colors hover:text-brand-dark"
                            >
                              {signupMode === "signin"
                                ? m.signup.createLink
                                : m.signup.signIn}
                            </button>
                          </p>
                          <button
                            type="button"
                            onClick={handleSkipSignup}
                            className="block w-full text-center text-xs text-text-muted hover:text-brand transition-colors"
                          >
                            {m.signup.skip}
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
                defaultValue={answers[currentStepData.id]}
              />
            </div>
          </div>
        )}

        {/* Results summary */}
        {result && showResults && (
          <div className="border-t border-border bg-surface-dim px-6 py-6">
            <div className="mx-auto max-w-xl space-y-4">
              <div className="rounded-[16px] border border-brand/30 bg-brand/5 p-5 text-center space-y-2">
                <p className="font-display text-3xl font-semibold text-brand">
                  {pursuableCount === 0
                    ? m.results.noMatches
                    : result.totalEstimatedMonthly > 0
                      ? fmt(m.results.perMonth, {
                          amount: result.totalEstimatedMonthly.toLocaleString(),
                        })
                      : fmt(
                          pursuableCount === 1
                            ? m.results.matchesOne
                            : m.results.matchesOther,
                          { count: pursuableCount },
                        )}
                </p>
                <p className="text-sm text-text-muted">
                  {pursuableCount === 0
                    ? m.results.noMatchesDetail
                    : result.totalEstimatedMonthly > 0 &&
                      fmt(
                        pursuableCount === 1
                          ? m.results.annualOne
                          : m.results.annualOther,
                        {
                          amount: result.totalEstimatedAnnual.toLocaleString(),
                          count: pursuableCount,
                        },
                      )}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {result.programs
                    .filter((p) =>
                      PURSUABLE_TIERS.has(p.result.eligibilityTier),
                    )
                    .map(({ program }) => (
                      <span
                        key={program.id}
                        className="rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-medium text-brand"
                      >
                        {localizeProgram(program, t).shortName}
                      </span>
                    ))}
                </div>
                <p className="text-xs text-text-subtle pt-1">
                  {m.results.disclaimer}
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => router.push("/results")}
                  className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                >
                  {m.results.viewFull}
                </button>
                <button
                  onClick={handleRestart}
                  className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-muted transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                >
                  {m.results.startOver}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Right panel: Grainient + value prop ─────────────── */}
      <div className="hidden lg:flex lg:flex-1 relative border-s border-border overflow-hidden h-full">
        {/* Grainient background, same as homepage hero */}
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
        {/* Dark vignette overlay for legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,10,40,0.55) 0%, rgba(20,10,40,0.25) 50%, rgba(20,10,40,0.55) 100%)",
          }}
        />

        {signedInEmail && (
          <div className="absolute top-4 end-6 z-20 flex items-center gap-3 text-sm text-white/80">
            <span>
              {withSlot(
                m.panel.signedInAs,
                "email",
                <span className="font-medium text-white">{signedInEmail}</span>,
              )}
            </span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                {m.panel.signOut}
              </button>
            </form>
          </div>
        )}

        {/* Value prop content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 xl:px-16">
          {/* Logo */}
          <div className="mb-10">
            <Image
              src="/images/brand/logo-light.svg"
              alt="Benefind"
              width={120}
              height={22}
              priority
            />
            <p className="mt-2 text-sm text-white/70">{m.panel.tagline}</p>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white xl:text-4xl">
            {m.panel.headline}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 max-w-xs">
            {signedInEmail ? m.panel.introSignedIn : m.panel.intro}
          </p>

          {/* Steps */}
          <div className="mt-10 space-y-7">
            {stepsPreview.map(({ icon: Icon, label, desc }, i) => (
              <div key={label} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/15 backdrop-blur-sm mt-0.5">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                    {fmt(m.panel.stepLabel, { n: i + 1 })}
                  </span>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-0.5 text-sm text-white/70 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy note */}
          <div className="mt-12 flex items-start gap-3 rounded-[16px] border border-white/20 bg-white/10 px-4 py-3.5 backdrop-blur-md">
            <Lock className="h-4 w-4 text-white/80 mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed text-white/80">
              {signedInEmail ? m.panel.privacySignedIn : m.panel.privacy}
            </p>
          </div>

          {/* Programs count */}
          <p className="mt-6 text-xs text-white/60">
            {withSlot(
              m.panel.programsCount,
              "highlight",
              <span className="font-semibold text-white/90">
                {m.panel.programsHighlight}
              </span>,
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
