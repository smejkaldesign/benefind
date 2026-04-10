import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/blog";
import type { BlogPostWithMeta } from "@/lib/blog";
import { LandingNav } from "@/components/landing-nav";

export const metadata: Metadata = {
  title: "Government Programs Blog | Benefind",
  description:
    "Plain-language guides on SNAP, Medicaid, LIHEAP, R&D tax credits, and every other government benefit program we screen for on Benefind.",
  alternates: { canonical: "https://benefind.app/blog" },
  openGraph: {
    title: "Government Programs Blog | Benefind",
    description:
      "Plain-language guides on SNAP, Medicaid, LIHEAP, R&D tax credits, and every other government benefit program we screen for on Benefind.",
    url: "https://benefind.app/blog",
    siteName: "Benefind",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Programs Blog | Benefind",
    description:
      "Plain-language guides on every government benefit program we screen for.",
  },
};

function FeaturedCard({ post }: { post: BlogPostWithMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-border bg-surface-dim transition-all hover:border-brand/40 hover:bg-surface-bright">
        {post.heroImage && (
          <div className="relative aspect-[2.4/1] w-full overflow-hidden">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}
        <div className="p-6 md:p-10">
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
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-surface-bright px-1.5 py-0.5 font-mono text-[10px] text-text-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight text-text transition-colors group-hover:text-brand md:text-3xl">
            {post.title}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted">
            {post.description}
          </p>
          <span className="mt-5 inline-block text-sm font-medium text-brand">
            Read article →
          </span>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPostWithMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface-dim transition-all hover:border-brand/40 hover:bg-surface-bright">
        {post.heroImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 512px"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            <time
              dateTime={post.date}
              className="font-mono text-[11px] text-text-subtle"
            >
              {formatDate(post.date)}
            </time>
            <span className="font-mono text-[11px] text-text-subtle">·</span>
            <span className="font-mono text-[11px] text-text-subtle">
              {post.readingTime} min
            </span>
          </div>
          <h2 className="mb-2 font-display text-lg font-semibold text-text transition-colors group-hover:text-brand">
            {post.title}
          </h2>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
            {post.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-surface-bright px-1.5 py-0.5 font-mono text-[10px] text-text-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Benefind Government Programs Blog",
    url: "https://benefind.app/blog",
    description:
      "Plain-language guides on SNAP, Medicaid, LIHEAP, R&D tax credits, and every other government benefit program.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      author: { "@type": "Organization", name: p.author },
      url: `https://benefind.app/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <LandingNav />
      <main className="min-h-screen bg-surface pt-[4.5rem] text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        {/* Hero section */}
        <div className="border-b border-dashed border-border">
          <div className="mx-auto max-w-[1520px] px-6 py-16 md:py-24">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand">
              [Government Programs]
            </p>
            <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-5xl">
              Every program, in plain English.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
              Deep guides on SNAP, Medicaid, LIHEAP, R&amp;D tax credits, and
              every other government benefit we screen for. Written for real
              people, not policy wonks.
            </p>
          </div>
        </div>

        {/* Posts */}
        <div className="mx-auto max-w-[1520px] px-6 py-12 md:py-16">
          {posts.length === 0 ? (
            <p className="text-sm text-text-subtle">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="flex flex-col gap-8">
              {featured && <FeaturedCard post={featured} />}
              {rest.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
