interface ChatMessageProps {
  role: "assistant" | "user";
  children: React.ReactNode;
  helpText?: string;
}

export function ChatMessage({ role, children, helpText }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        aria-label={`${role} message`}
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%] ${
          isAssistant
            ? "rounded-bl-md bg-surface-bright text-text"
            : "rounded-br-md bg-brand text-surface"
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
  return (
    <div className="flex gap-1" role="status" aria-label="Assistant is typing">
      <span className="h-2 w-2 animate-bounce rounded-full bg-text-subtle [animation-delay:0ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-text-subtle [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-text-subtle [animation-delay:300ms]" />
    </div>
  );
}
