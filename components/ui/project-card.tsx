import type { Project } from "@/lib/projects";
import { ProjectCover } from "./project-cover";
import { AwardBadge } from "./award-badge";

export function ProjectCard({ project }: { project: Project }) {
  // overflow-x-clip on the article contains the Award badge canvas, which bleeds 48px past the pill.
  return (
    <article className="flex flex-col gap-3 overflow-x-clip">
      <div className="relative">
        <ProjectCover project={project} showCredit={false} />
        {project.badge && (
          <div className="absolute left-3.5 top-3.5">
            <AwardBadge label={project.badge} />
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-[17px] font-medium leading-[normal] text-ink">
          {project.title}
        </h2>
        <span className="font-mono text-[13px] leading-[normal] text-faint">
          {project.year}
        </span>
      </div>
      <p className="text-sm leading-[21px] text-muted">{project.summary}</p>
      {project.cover.kind === "photo" && (
        <p className="text-xs text-muted">Photo: {project.cover.credit}</p>
      )}
      <div className="mt-auto flex items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-xs leading-[normal] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        {(project.liveUrl || project.codeUrl) && (
          <div className="flex shrink-0 gap-3.5 text-[13px] leading-[normal] text-ink">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="underline after:content-['_↗']"
              >
                Live
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
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
