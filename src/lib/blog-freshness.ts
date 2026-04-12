import { posts } from "./blog";

export interface StalenessReport {
  slug: string;
  title: string;
  lastModified: string;
  daysSinceUpdate: number;
  isStale: boolean;
}

export function checkFreshness(staleDays = 90): StalenessReport[] {
  const now = new Date();
  return posts
    .filter((p) => p.published)
    .map((p) => {
      const lastMod = new Date((p.lastModified || p.date) + "T00:00:00");
      const daysSinceUpdate = Math.floor(
        (now.getTime() - lastMod.getTime()) / (1000 * 60 * 60 * 24),
      );
      return {
        slug: p.slug,
        title: p.title,
        lastModified: p.lastModified || p.date,
        daysSinceUpdate,
        isStale: daysSinceUpdate >= staleDays,
      };
    })
    .sort((a, b) => b.daysSinceUpdate - a.daysSinceUpdate);
}
