import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-text-subtle"
    >
      {items.map((item, idx) => (
        <span
          key={`${item.label}-${idx}`}
          className="flex items-center gap-1.5"
        >
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text-muted">{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <span className="text-text-subtle">/</span>
          )}
        </span>
      ))}
    </nav>
  );
}
