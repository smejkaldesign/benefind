'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SCREENING_STEPS, answersToScreeningInput } from '@/lib/screening/steps';
import { runScreening } from '@/lib/benefits/engine';
import type { ScreeningResult } from '@/lib/benefits/types';
import { ChatMessage, TypingIndicator } from '@/components/screening/chat-message';
import { StepInput } from '@/components/screening/step-input';
import { InlineOptions, hasInlineOptions } from '@/components/screening/inline-options';
import { AsciiWaves } from '@/components/ascii-waves';
import { ArrowLeft, RotateCcw, MessageSquare, Zap, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { US_STATES } from '@/lib/screening/us-states';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

const STEPS_PREVIEW = [
  {
    icon: MessageSquare,
    label: 'Answer a few questions',
    desc: 'Household size, income, and where you live. Takes about 3 minutes.',
  },
  {
    icon: Zap,
    label: 'We match you instantly',
    desc: 'Our engine checks eligibility across 12+ federal programs in real time.',
  },
  {
    icon: CheckCircle2,
    label: 'See your results',
    desc: "View every program you qualify for, with estimated amounts and next steps.",
  },
];

export default function ScreeningPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const router = useRouter();

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  }, []);

  const addMessage = useCallback(
    (role: 'assistant' | 'user', content: string) => {
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
      const step = SCREENING_STEPS[stepIndex];
      if (!step) return;

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('assistant', step.question);
        if (step.helpText) {
          setTimeout(() => {
            addMessage('assistant', step.helpText!);
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
      'assistant',
      "Hi! I'm here to help you find government benefits you may qualify for. This takes about 3 minutes.",
    );
    setTimeout(() => {
      addMessage('assistant', "Your answers are private and won't be shared with anyone. Let's get started.");
      setTimeout(() => showStep(0), 400);
    }, 800);
  }, [addMessage, showStep]);

  function handleAnswer(value: string) {
    const step = SCREENING_STEPS[currentStep];
    if (!step) return;

    let displayValue = value;
    if (step.type === 'select' || step.type === 'state') {
      const opt = step.options?.find((o) => o.value === value);
      displayValue = opt?.label ?? value;
      if (step.type === 'state') {
        const state = US_STATES.find((s) => s.value === value);
        displayValue = state?.label ?? value;
      }
    }
    if (step.type === 'multi-select') {
      const labels = value
        .split(',')
        .map((v) => step.options?.find((o) => o.value === v)?.label ?? v);
      displayValue = labels.join(', ');
    }
    if (step.type === 'number' && step.id !== 'householdSize') {
      displayValue = `$${parseInt(value).toLocaleString()}`;
    }

    addMessage('user', displayValue);

    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    let nextStep = currentStep + 1;

    if (SCREENING_STEPS[nextStep]?.id === 'childrenAges' && newAnswers.hasChildren !== 'yes') {
      nextStep++;
    }

    if (nextStep >= SCREENING_STEPS.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('assistant', "Great, I have everything I need. Let me check which programs you qualify for...");
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const input = answersToScreeningInput(newAnswers);
          const screeningResult = runScreening(input);
          setResult(screeningResult);
          try {
            const { input: _pii, ...safeResult } = screeningResult;
            sessionStorage.setItem('screening_result', JSON.stringify(safeResult));
          } catch {}

          const eligible = screeningResult.programs.filter((p) => p.result.eligible);
          if (eligible.length > 0) {
            addMessage(
              'assistant',
              `You may qualify for ${eligible.length} program${eligible.length > 1 ? 's' : ''} worth an estimated $${screeningResult.totalEstimatedMonthly.toLocaleString()}/month ($${screeningResult.totalEstimatedAnnual.toLocaleString()}/year). Scroll down to see your results.`,
            );
          } else {
            addMessage(
              'assistant',
              "Based on the information provided, you may not qualify for the programs we currently check. This doesn't mean there aren't other programs available — check with your local social services office.",
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
    initialized.current = false;
    setTimeout(() => {
      initialized.current = true;
      addMessage('assistant', "Let's start fresh. I'll ask you the same questions again.");
      setTimeout(() => showStep(0), 400);
    }, 100);
  }

  const currentStepData = SCREENING_STEPS[currentStep];
  const progress = Math.round((currentStep / SCREENING_STEPS.length) * 100);

  return (
    <div className="flex h-dvh overflow-hidden bg-white">

      {/* ── Left panel: conversation ──────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden lg:max-w-[55%]">

        {/* Header */}
        <header className="shrink-0 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
          <div className="flex h-14 items-center gap-3 px-4">
            <Link href="/" className="text-gray-400 hover:text-gray-700 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold text-gray-900">Eligibility Check</h1>
                {result && (
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Restart
                  </button>
                )}
              </div>
              <div
                className="mt-1 h-1 w-full rounded-full bg-gray-100"
                role="progressbar"
                aria-valuenow={result ? 100 : progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Screening progress"
              >
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${result ? 100 : progress}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Messages — anchored to bottom, grows upward, stable scrollbar gutter */}
        <div ref={scrollRef} className="flex-1 overflow-y-scroll" style={{ scrollbarGutter: 'stable' }}>
          <div className="flex min-h-full flex-col justify-end px-4 py-6">
            <div className="mx-auto w-full max-w-xl">
              <div className="space-y-3" role="log" aria-live="polite" aria-label="Conversation">
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
                {/* Inline quick-pick options rendered in the conversation */}
                {!result && !isTyping && currentStepData && hasInlineOptions(currentStepData) && (
                  <InlineOptions step={currentStepData} onSubmit={handleAnswer} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom input — always visible; disabled while assistant is typing */}
        {!result && currentStepData && (
          <div className="sticky bottom-0 border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-sm">
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
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-6">
            <div className="mx-auto max-w-xl space-y-4">
              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-5 text-center space-y-2">
                <p className="text-2xl font-bold text-emerald-600">
                  ${result.totalEstimatedMonthly.toLocaleString()}/month
                </p>
                <p className="text-sm text-gray-500">
                  Estimated ${result.totalEstimatedAnnual.toLocaleString()}/year across{' '}
                  {result.programs.filter((p) => p.result.eligible).length} program
                  {result.programs.filter((p) => p.result.eligible).length !== 1 ? 's' : ''}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {result.programs
                    .filter((p) => p.result.eligible)
                    .map(({ program }) => (
                      <span
                        key={program.id}
                        className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                      >
                        {program.shortName}
                      </span>
                    ))}
                </div>
                <p className="text-xs text-gray-400 pt-1">
                  These are estimates. Actual amounts depend on your situation and state.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => router.push('/results')}
                  className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  View Full Results
                </button>
                <button
                  onClick={handleRestart}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Right panel: ASCII + value prop — never scrolls ─── */}
      <div className="hidden lg:flex lg:flex-1 relative border-l border-gray-100 bg-gray-50 overflow-hidden h-full">

        {/* ASCII waves — light mode: emerald on white, very low opacity */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <AsciiWaves
            color="#10B981"
            speed={0.25}
            intensity={0.7}
            elementSize={13}
            waveTension={0.28}
            waveTwist={0.06}
          />
        </div>

        {/* Value prop content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 xl:px-16">

          {/* Logo/wordmark */}
          <div className="mb-10">
            <span className="text-xl font-bold text-emerald-500">Benefind</span>
            <p className="mt-1 text-sm text-gray-400">Benefits navigator, built for you</p>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 xl:text-3xl">
            Here&apos;s what&apos;s about to happen
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500 max-w-xs">
            A short conversation is all it takes. No account needed. No paperwork. Just answers.
          </p>

          {/* Steps */}
          <div className="mt-10 space-y-7">
            {STEPS_PREVIEW.map(({ icon: Icon, label, desc }, i) => (
              <div key={label} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 mt-0.5">
                  <Icon className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500/60">
                      Step {i + 1}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="mt-0.5 text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy note */}
          <div className="mt-12 flex items-start gap-3 rounded-xl border border-gray-200 bg-white/70 px-4 py-3.5 backdrop-blur-sm">
            <Lock className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed text-gray-500">
              Your answers are stored locally on your device and never sent to a server.
              We don&apos;t store personally identifiable information. This is a screening
              tool, not a formal application.
            </p>
          </div>

          {/* Programs count */}
          <p className="mt-6 text-xs text-gray-400">
            Checks eligibility across{' '}
            <span className="font-semibold text-gray-600">12+ federal and state programs</span>{' '}
            including SNAP, Medicaid, WIC, SSI, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
