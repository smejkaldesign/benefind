const BASE_URL = "https://benefind.app";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const isLast = i === items.length - 1;
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
      };
      if (!isLast && item.href) {
        entry.item = `${BASE_URL}${item.href}`;
      }
      return entry;
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ld).replace(/</g, "\\u003c"),
      }}
    />
  );
}
