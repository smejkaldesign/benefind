/**
 * Label shown under an icon button after a 0.5s hover or on keyboard focus.
 * CSS-only so it can wrap any control (including menu triggers) without
 * merging trigger props.
 */
export function HoverHint({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span className="group/hint relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 rounded-md bg-foreground px-2.5 py-1 text-xs whitespace-nowrap text-background opacity-0 transition-opacity duration-150 group-focus-within/hint:visible group-focus-within/hint:opacity-100 group-hover/hint:visible group-hover/hint:opacity-100 group-hover/hint:delay-500"
      >
        {label}
      </span>
    </span>
  );
}
