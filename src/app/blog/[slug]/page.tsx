import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPost, getAllPosts, getRelatedPosts, formatDate } from "@/lib/blog";
import { extractTOC } from "@/lib/blog-toc";
import { LandingNav } from "@/components/landing-nav";
import { AuthorCard } from "@/components/blog/author-card";
import { HeroImage } from "@/components/blog/hero-image";
import { StickyTOC } from "@/components/blog/sticky-toc";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://benefind.app/blog/${slug}`;
  const cover = post.heroImage ?? "/blog/covers/default.svg";
  return {
    title: `${post.title} — Benefind`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} — Benefind`,
      description: post.description,
      url,
      siteName: "Benefind",
      images: [{ url: cover, width: 1200, height: 630, alt: post.title }],
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Benefind`,
      description: post.description,
      images: [cover],
    },
  };
}

async function loadPostContent(slug: string) {
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    return mod.default as React.ComponentType;
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const PostContent = await loadPostContent(slug);
  if (!PostContent) notFound();

  const tocItems = extractTOC(slug);
  const related = getRelatedPosts(slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://benefind.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Benefind",
      url: "https://benefind.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://benefind.app/blog/${slug}`,
    },
    image: post.heroImage
      ? `https://benefind.app${post.heroImage}`
      : "https://benefind.app/og-image.png",
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <LandingNav />
      <main className="min-h-screen bg-surface pt-[4.5rem] text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Post header — full width */}
        <div className="border-b border-dashed border-border">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-brand/40 hover:text-text"
            >
              ← All posts
            </Link>

            <div className="mb-3 flex flex-wrap items-center gap-3">
              <time
                dateTime={post.date}
                className="font-mono text-[11px] text-text-subtle"
              >
                {formatDate(post.date)}
              </time>
              <span className="font-mono text-[11px] text-text-subtle">·</span>
              <span className="font-mono text-[11px] text-text-subtle">
                {post.readingTime} min read
              </span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-surface-bright px-1.5 py-0.5 font-mono text-[10px] text-text-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {post.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
              {post.description}
            </p>
          </div>
        </div>

        {/* Hero image */}
        {post.heroImage && (
          <div className="mx-auto max-w-5xl px-6 py-8">
            <HeroImage src={post.heroImage} alt={post.title} priority />
          </div>
        )}

        {/* 3-column layout: author | content | TOC */}
        <div className="mx-auto max-w-5xl px-6 pb-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[180px_1fr_200px]">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <AuthorCard
                  author={post.author}
                  date={post.date}
                  readingTime={post.readingTime}
                />
              </div>
            </aside>

            <article className="min-w-0">
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-muted">{post.author}</span>
                  <span className="text-text-subtle">·</span>
                  <span className="text-sm text-text-subtle">
                    {post.readingTime} min read
                  </span>
                </div>
              </div>

              {tocItems.length > 0 && (
                <details className="mb-8 rounded-lg border border-border bg-surface-dim lg:hidden">
                  <summary className="cursor-pointer px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-text-subtle">
                    Table of contents
                  </summary>
                  <div className="border-t border-border px-4 py-3">
                    <ul className="flex flex-col gap-1">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`block py-1 text-[13px] text-text-muted transition-colors hover:text-text ${
                              item.level === 3 ? "pl-4" : ""
                            }`}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              )}

              <div className="benefind-prose max-w-none">
                <PostContent />
              </div>

              <div className="mt-16 border-t border-dashed border-border pt-8">
                <p className="text-sm text-text-subtle">
                  Written by{" "}
                  <span className="font-medium text-text-muted">
                    {post.author}
                  </span>
                </p>
              </div>

              {related.length > 0 && (
                <section className="mt-16">
                  <h2 className="mb-6 font-display text-xl font-semibold text-text">
                    Related articles
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="group block overflow-hidden rounded-lg border border-border bg-surface-dim transition-all hover:border-brand/40"
                      >
                        {r.heroImage && (
                          <div className="relative aspect-[16/9] w-full overflow-hidden">
                            <Image
                              src={r.heroImage}
                              alt={r.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 300px"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-display text-sm font-semibold text-text group-hover:text-brand">
                            {r.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-xs text-text-subtle">
                            {r.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <StickyTOC items={tocItems} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
