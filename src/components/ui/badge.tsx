type BadgeVariant = "default" | "success" | "warning" | "error" | "brand";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-bright text-text-muted",
  success: "bg-brand/15 text-brand",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  brand: "bg-brand/15 text-brand",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
