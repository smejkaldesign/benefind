"use client";

import { useEffect, useState } from "react";
import type { TOCItem } from "@/lib/blog-toc";

interface StickyTOCProps {
  items: TOCItem[];
}

export function StickyTOC({ items }: StickyTOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-1">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
        On this page
      </p>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 py-1 text-[13px] leading-snug transition-colors ${
                item.level === 3 ? "pl-5" : "pl-3"
              } ${
                activeId === item.id
                  ? "border-brand text-brand"
                  : "border-transparent text-text-subtle hover:text-text-muted"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
