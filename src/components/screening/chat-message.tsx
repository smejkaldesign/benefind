interface ChatMessageProps {
  role: 'assistant' | 'user';
  children: React.ReactNode;
}

export function ChatMessage({ role, children }: ChatMessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%] ${
          isAssistant
            ? 'rounded-bl-md bg-surface-bright text-text'
            : 'rounded-br-md bg-brand text-white'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-md bg-surface-bright px-4 py-3">
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-text-subtle [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-text-subtle [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-text-subtle [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
