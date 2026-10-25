"use client";

import { useI18n } from "@/lib/i18n/context";

interface ChatMessageProps {
  role: "assistant" | "user";
  children: React.ReactNode;
  helpText?: string;
}

export function ChatMessage({ role, children, helpText }: ChatMessageProps) {
  const { t } = useI18n();
  const isAssistant = role === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        aria-label={
          isAssistant
            ? t.screeningFlow.messages.assistant
            : t.screeningFlow.messages.user
        }
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%] ${
          isAssistant
            ? "rounded-es-[4px] bg-surface-bright text-text"
            : "rounded-ee-[4px] bg-brand text-stone-900"
        }`}
      >
        {children}
        {helpText && (
          <p className="mt-1.5 text-xs leading-relaxed text-text-subtle">
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  const { t } = useI18n();
  return (
    <div
      className="flex gap-1"
      role="status"
      aria-label={t.screeningFlow.messages.typing}
    >
      <span className="h-2 w-2 animate-bounce rounded-full bg-text-subtle [animation-delay:0ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-text-subtle [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-text-subtle [animation-delay:300ms]" />
    </div>
  );
}
