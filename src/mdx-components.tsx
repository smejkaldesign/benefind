import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { slugify } from "@/lib/slugify";

/**
 * Global MDX component mapping.
 *
 * Keeps article prose branded to Benefind tokens and gives us control over
 * anchor behavior (internal links via next/link, external opens in new tab).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mt-0 mb-6 font-display text-4xl font-semibold tracking-tight text-text"
        {...props}
      />
    ),
    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => {
      const id = slugify(String(children));
      return (
        <h2
          id={id}
          className="mt-12 mb-4 font-display text-2xl font-semibold tracking-tight text-text scroll-mt-24"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => {
      const id = slugify(String(children));
      return (
        <h3
          id={id}
          className="mt-8 mb-3 font-display text-xl font-semibold tracking-tight text-text scroll-mt-24"
          {...props}
        >
          {children}
        </h3>
      );
    },
    p: (props) => (
      <p
        className="my-4 text-base leading-relaxed text-text-muted"
        {...props}
      />
    ),
    a: ({ href = "", children, ...props }) => {
      const isInternal = href.startsWith("/") || href.startsWith("#");
      if (isInternal) {
        return (
          <Link
            href={href}
            className="text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
          {...props}
        >
          {children}
        </a>
      );
    },
    ul: (props) => (
      <ul
        className="my-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-text-muted marker:text-brand/60"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="my-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-text-muted marker:text-brand/60"
        {...props}
      />
    ),
    li: (props) => <li className="pl-1" {...props} />,
    strong: (props) => (
      <strong className="font-semibold text-text" {...props} />
    ),
    em: (props) => <em className="italic text-text" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-2 border-brand/60 bg-surface-dim px-5 py-3 text-base italic text-text-muted"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-surface-dim px-1.5 py-0.5 font-mono text-[0.85em] text-brand"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-border bg-surface-dark p-4 text-[0.85rem] leading-relaxed text-text-muted"
        {...props}
      />
    ),
    table: (props) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table
          className="w-full border-collapse text-left text-sm"
          {...props}
        />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-border bg-surface-dim px-4 py-2 font-semibold text-text"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border-b border-border/50 px-4 py-2 text-text-muted"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-border" />,
    ...components,
  };
}
