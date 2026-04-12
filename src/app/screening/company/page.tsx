"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  COMPANY_SCREENING_STEPS,
  answersToCompanyInput,
} from "@/lib/screening/company-steps";
import { runCompanyScreening } from "@/lib/benefits/company-engine";
import type { CompanyScreeningResult } from "@/lib/benefits/company-types";
import { totalEstimatedAnnualValue } from "@/lib/benefits/company-types";
import {
  ChatMessage,
  TypingIndicator,
} from "@/components/screening/chat-message";
import { StepInput } from "@/components/screening/step-input";
import {
  InlineOptions,
  hasInlineOptions,
} from "@/components/screening/inline-options";
import dynamic from "next/dynamic";

const Grainient = dynamic(
  () => import("@/components/grainient").then((mod) => mod.Grainient),
  { ssr: false },
);
import Image from "next/image";
import { STORAGE_KEYS } from "@/lib/constants";
import {
  ArrowLeft,
  RotateCcw,
  Building2,
  Search,
  CheckCircle2,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { US_STATES } from "@/lib/screening/us-states";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

const STEPS_PREVIEW = [
  {
    icon: Building2,
    label: "Tell us about your company",
    desc: "Industry, size, revenue, and what you do. Takes about 3 minutes.",
  },
  {
    icon: Search,
    label: "We scan 20+ programs",
    desc: "Federal grants, tax credits, state incentives, and contracting preferences matched to your profile.",
  },
  {
    icon: CheckCircle2,
    label: "See your matches",
    desc: "View every program you qualify for, with estimated values and next steps.",
  },
];

export default function CompanyScreeningPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [result, setResult] = useState<CompanyScreeningResult | null>(null);
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
    (role: "assistant" | "user", content: string) => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role, content },
      ]);
      scrollToBottom();
    },
    [scrollToBottom],
  );

  const showStep = useCallback(
    (stepIndex: number) => {
      const step = COMPANY_SCREENING_STEPS[stepIndex];
      if (!step) return;

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage("assistant", step.question);
        if (step.helpText) {
          setTimeout(() => {
            addMessage("assistant", step.helpText!);
          }, 300);
        }
      }, 600);
    },
    [addMessage],
  );

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    addMessage(
      "assistant",
      "Hi! I'll help you find government grants, tax credits, and incentives for your business. This takes about 3 minutes.",
    );
    setTimeout(() => {
      addMessage(
        "assistant",
        "Your answers are private and won't be shared. Let's find what you qualify for.",
      );
      setTimeout(() => showStep(0), 400);
    }, 800);
  }, [addMessage, showStep]);

  function handleAnswer(value: string) {
    const step = COMPANY_SCREENING_STEPS[currentStep];
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
      COMPANY_SCREENING_STEPS[nextStep]?.id === "rndPercentage" &&
      newAnswers.hasRnd !== "yes"
    ) {
      nextStep++;
    }

    if (nextStep >= COMPANY_SCREENING_STEPS.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage(
          "assistant",
          "Great, I have your company profile. Let me scan for matching programs...",
        );
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
          } catch {}

          const eligible = screeningResult.programs.filter(
            (p) => p.result.eligible,
          );
          if (eligible.length > 0) {
            const topProgram = eligible[0]!;
            addMessage(
              "assistant",
              `${input.companyName} may qualify for ${eligible.length} program${eligible.length > 1 ? "s" : ""}. Your top match is the ${topProgram.program.shortName} (${topProgram.result.matchScore}% match). Scroll down to see all results.`,
            );
          } else {
            addMessage(
              "assistant",
              "Based on the information provided, we didn't find strong matches right now. This may change as new programs are announced. Check back or expand your company profile for better matching.",
            );
          }
        }, 1500);
      }, 600);
    } else {
      setCurrentStep(nextStep);
      showStep(nextStep);
    }
  }

  function handleRestart() {
    setMessages([]);
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.COMPANY_SCREENING_RESULT);
    } catch {}
    initialized.current = false;
    setTimeout(() => {
      initialized.current = true;
      addMessage(
        "assistant",
        "Let's start fresh. I'll ask you the same questions again.",
      );
      setTimeout(() => showStep(0), 400);
    }, 100);
  }

  const currentStepData = COMPANY_SCREENING_STEPS[currentStep];
  const progress = Math.round(
    (currentStep / COMPANY_SCREENING_STEPS.length) * 100,
  );

  return (
    <div className="flex h-dvh overflow-hidden bg-surface text-text">
      {/* ── Left panel: conversation ──────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden lg:max-w-[55%]">
        {/* Header */}
        <header className="shrink-0 border-b border-border bg-surface/80 backdrop-blur-[30px]">
          <div className="flex h-16 items-center gap-3 px-6">
            <Link
              href="/get-started"
              className="text-text-subtle hover:text-text transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold text-text">
                  Company Eligibility Check
                </h1>
                {result && (
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1 text-xs text-text-subtle hover:text-brand transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Restart
                  </button>
                )}
              </div>
              <div
                className="mt-1.5 h-1 w-full rounded-full bg-surface-bright"
                role="progressbar"
                aria-valuenow={result ? 100 : progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Screening progress"
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
                aria-label="Conversation"
              >
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} role={msg.role}>
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
              </div>
            </div>
          </div>
        </div>

        {/* Bottom input */}
        {!result && currentStepData && (
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
        {result && (
          <div className="border-t border-border bg-surface-dim px-6 py-6">
            <div className="mx-auto max-w-xl space-y-4">
              <div className="rounded-[16px] border border-brand/30 bg-brand/5 p-5 text-center space-y-2">
                <p className="font-display text-4xl font-semibold text-brand">
                  ${totalEstimatedAnnualValue(result.programs).toLocaleString()}
                  <span className="text-base font-normal text-text-muted">
                    {" "}
                    / year
                  </span>
                </p>
                <p className="text-sm text-text-muted">
                  Estimated value across {result.totalMatched} program
                  {result.totalMatched !== 1 ? "s" : ""}
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
                        {program.shortName}
                      </span>
                    ))}
                  {result.totalMatched > 5 && (
                    <span className="rounded-full bg-surface-bright px-2.5 py-0.5 text-xs font-medium text-text-muted">
                      +{result.totalMatched - 5} more
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-subtle pt-1">
                  These are preliminary matches. Verify eligibility with program
                  administrators.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => router.push("/results/company")}
                  className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                >
                  View Full Results
                </button>
                <button
                  onClick={handleRestart}
                  className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-muted transition-colors hover:border-brand hover:text-brand"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Right panel: Grainient + value prop ─────────────── */}
      <div className="hidden lg:flex lg:flex-1 relative border-l border-border overflow-hidden h-full">
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
            <p className="mt-2 text-sm text-white/70">
              Grant navigator, built for your business
            </p>
          </div>

          <h2 className="font-display text-3xl font-semibold tracking-tight text-white xl:text-4xl">
            Here&apos;s what&apos;s about to happen
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 max-w-xs">
            A short conversation about your business. We scan 20+ federal and
            state programs to find your matches.
          </p>

          <div className="mt-10 space-y-7">
            {STEPS_PREVIEW.map(({ icon: Icon, label, desc }, i) => (
              <div key={label} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/15 backdrop-blur-sm mt-0.5">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                    Step {i + 1}
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
              Your business information is stored locally on your device and
              never sent to a server. This is a screening tool, not a formal
              application.
            </p>
          </div>

          <p className="mt-6 text-xs text-white/60">
            Scans{" "}
            <span className="font-semibold text-white/90">
              20+ federal and state programs
            </span>{" "}
            including R&D Tax Credit, SBIR, WOTC, Workforce Training, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
