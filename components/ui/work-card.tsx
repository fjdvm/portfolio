import type { Work } from "@/lib/works";
import { WorkCover } from "./work-cover";
import { AwardBadge } from "./award-badge";

export function WorkCard({ work }: { work: Work }) {
  // overflow-x-clip on the article contains the Award badge canvas, which bleeds 48px past the pill.
  return (
    <article className="flex flex-col gap-3 overflow-x-clip">
      <div className="relative">
        <WorkCover work={work} showCredit={false} />
        {work.badge && (
          <div className="absolute left-3.5 top-3.5">
            <AwardBadge label={work.badge} />
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-[17px] font-medium leading-[normal] text-ink">
          {work.title}
        </h2>
        <span className="font-mono text-[13px] leading-[normal] text-faint">
          {work.year}
        </span>
      </div>
      <p className="text-sm leading-[21px] text-muted">{work.summary}</p>
      {work.cover.kind === "photo" && (
        <p className="text-xs text-muted">Photo: {work.cover.credit}</p>
      )}
      <div className="mt-auto flex items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-xs leading-[normal] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        {(work.liveUrl || work.codeUrl) && (
          <div className="flex shrink-0 gap-3.5 text-[13px] leading-[normal] text-ink">
            {work.liveUrl && (
              <a
                href={work.liveUrl}
                className="underline after:content-['_↗']"
              >
                Live
              </a>
            )}
            {work.codeUrl && (
              <a
                href={work.codeUrl}
                className="underline after:content-['_↗']"
              >
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
