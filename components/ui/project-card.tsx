import type { Project } from "@/lib/projects";
import { ProjectCover } from "./project-cover";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-3">
      <ProjectCover project={project} />
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-[17px] font-medium leading-[normal] text-ink">{project.title}</h2>
        <span className="font-mono text-[13px] leading-[normal] text-faint">{project.year}</span>
      </div>
      {project.status && (
        <p className="self-start rounded-full bg-accentsoft px-[9px] py-[3px] text-xs font-medium leading-[normal] text-accent">
          {project.status}
        </p>
      )}
      <p className="text-sm leading-[21px] text-muted">{project.summary}</p>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
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
          <div className="flex gap-3.5 text-[13px] leading-[normal] text-ink">
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
