import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { createServerSupabase } from "@/lib/supabase/server";
import { listActivePrograms } from "@/lib/db/programs";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://benefind.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/screening`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/screening/company`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/docs/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/docs/guides`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/docs/design-system`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/docs/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Programs catalog routes
  const supabase = await createServerSupabase();
  const { data: programs } = await listActivePrograms(supabase, {
    pageSize: 200,
  });

  const programRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/programs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...(programs ?? []).map((p) => ({
      url: `${BASE_URL}/programs/${p.id}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  return [...staticRoutes, ...blogRoutes, ...programRoutes];
}
