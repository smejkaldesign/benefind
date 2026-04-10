interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = "", padding = true }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface ${padding ? "p-4 sm:p-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={`font-semibold text-text ${className}`}>{children}</h3>;
}

export function CardDescription({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-sm text-text-muted ${className}`}>{children}</p>;
}
