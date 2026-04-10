import { formatDate } from "@/lib/blog";

interface AuthorCardProps {
  author: string;
  date: string;
  readingTime: number;
}

export function AuthorCard({ author, date, readingTime }: AuthorCardProps) {
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
          Published
        </span>
        <time dateTime={date} className="text-sm text-text-muted">
          {formatDate(date)}
        </time>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-subtle">
          Read time
        </span>
        <span className="text-sm text-text-muted">{readingTime} min read</span>
      </div>
    </div>
  );
}
