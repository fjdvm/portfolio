import Link from "next/link";
import { formatDate, type Writing } from "@/lib/writings";

export function WritingRow({ writing }: { writing: Writing }) {
  return (
    <Link
      href={`/writings/${writing.slug}`}
      className="flex items-baseline gap-6 py-[9px] leading-6 text-ink"
    >
      <span className="min-w-0 flex-1">{writing.title}</span>
      <time
        dateTime={writing.date}
        className="shrink-0 whitespace-nowrap font-mono text-[13px] text-faint"
      >
        {formatDate(writing.date)}
      </time>
    </Link>
  );
}

export function FeaturedEssay({ writing }: { writing: Writing }) {
  return (
    <article className="relative flex flex-col items-start gap-2.5 rounded-[14px] border border-line bg-surface px-7 py-[26px]">
      <p className="font-mono text-[11px] font-medium uppercase leading-[normal] tracking-[0.66px] text-nav-active">
        Latest · <time dateTime={writing.date}>{formatDate(writing.date)}</time>{" "}
        · {writing.readingTime} min read
      </p>
      <h2 className="font-serif text-[30px] font-medium leading-[38px] tracking-[-0.24px] text-ink">
        {writing.title}
      </h2>
      <p className="leading-[26px] text-ink2">{writing.summary}</p>
      <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <Link
          href={`/writings/${writing.slug}`}
          className="whitespace-nowrap text-sm font-medium leading-[normal] text-ink after:absolute after:inset-0"
        >
          Read the essay →
        </Link>
        <ul className="flex gap-3">
          {writing.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-xs leading-[normal] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
