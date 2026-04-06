'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SCREENING_STEPS, answersToScreeningInput } from '@/lib/screening/steps';
import { runScreening } from '@/lib/benefits/engine';
import type { ScreeningResult } from '@/lib/benefits/types';
import { ChatMessage, TypingIndicator } from '@/components/screening/chat-message';
import { StepInput } from '@/components/screening/step-input';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { US_STATES } from '@/lib/screening/us-states';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

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

  // Initialize with welcome message
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

    // Show user's answer as a message
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

    // Store answer
    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    // Skip conditional steps
    let nextStep = currentStep + 1;

    // Skip childrenAges if no children
    if (SCREENING_STEPS[nextStep]?.id === 'childrenAges' && newAnswers.hasChildren !== 'yes') {
      nextStep++;
    }

    if (nextStep >= SCREENING_STEPS.length) {
      // All steps done — run screening
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
            // Strip PII (input field contains income, household data) before storing
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
    <div className="flex min-h-dvh flex-col bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <Link href="/" className="text-text-muted hover:text-text">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-text">Eligibility Screening</h1>
            <div
              className="mt-1 h-1.5 w-full rounded-full bg-surface-bright"
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
          {result && (
            <button
              onClick={handleRestart}
              className="flex items-center gap-1 text-xs text-text-muted hover:text-brand"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restart
            </button>
          )}
        </div>
      </header>

      {/* Chat messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-2xl space-y-3" role="log" aria-live="polite" aria-label="Conversation">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role}>
              {msg.content}
            </ChatMessage>
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>

      {/* Input area */}
      {!result && currentStepData && !isTyping && (
        <div className="sticky bottom-0 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur-sm">
          <div className="mx-auto max-w-2xl">
            <StepInput step={currentStepData} onSubmit={handleAnswer} />
          </div>
        </div>
      )}

      {/* Results summary (compact; full detail on /results) */}
      {result && (
        <div className="border-t border-border bg-surface-dim px-4 py-6">
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="rounded-xl bg-brand/5 border border-brand/20 p-5 text-center space-y-2">
              <p className="text-2xl font-bold text-brand">
                ${result.totalEstimatedMonthly.toLocaleString()}/month
              </p>
              <p className="text-sm text-text-muted">
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
                      className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success"
                    >
                      {program.shortName}
                    </span>
                  ))}
              </div>
              <p className="text-xs text-text-subtle pt-1">
                These are estimates. Actual amounts depend on your situation and state.
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => router.push('/results')}
                className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                View Full Results
              </button>
              <button
                onClick={handleRestart}
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-text-muted hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
