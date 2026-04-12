import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="mb-6 font-mono text-[11px] uppercase tracking-widest">
      <BreadcrumbList>
        {items.map((item, idx) => (
          <BreadcrumbItem key={`${item.label}-${idx}`}>
            {idx > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
            {item.href ? (
              <BreadcrumbLink
                className="text-text-subtle transition-colors hover:text-brand"
                render={<Link href={item.href} />}
              >
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-text-muted">
                {item.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
