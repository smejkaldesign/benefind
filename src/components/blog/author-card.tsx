import { formatDate } from "@/lib/blog";
import { getServerI18n } from "@/lib/i18n/server";
import { fmt } from "@/lib/i18n/format";

interface AuthorCardProps {
  author: string;
  date: string;
  readingTime: number;
}

export async function AuthorCard({
  author,
  date,
  readingTime,
}: AuthorCardProps) {
  const { t: dict, locale } = await getServerI18n();
  const t = dict.seoPages.blog;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface-dim text-sm font-semibold text-brand">
          {author
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text">{author}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-dashed border-border pt-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-subtle">
          {t.published}
        </span>
        <time dateTime={date} className="text-sm text-text-muted">
          {formatDate(date, locale)}
        </time>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-subtle">
          {t.readTime}
        </span>
        <span className="text-sm text-text-muted">
          {fmt(t.minRead, { n: readingTime })}
        </span>
      </div>
    </div>
  );
}
