import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-lg border border-black/10 p-4 dark:border-white/15">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-semibold">{project.title}</h2>
        <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
          {project.year}
        </span>
      </div>
      {project.status && (
        <p className="mt-1 text-xs font-medium">{project.status}</p>
      )}
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {project.summary}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-black/10 px-2 py-0.5 dark:border-white/15"
          >
            {tag}
          </li>
        ))}
      </ul>
      {(project.liveUrl || project.codeUrl) && (
        <div className="mt-3 flex gap-4 text-sm">
          {project.liveUrl && (
            <a href={project.liveUrl} className="underline">
              Live
            </a>
          )}
          {project.codeUrl && (
            <a href={project.codeUrl} className="underline">
              Code
            </a>
          )}
        </div>
      )}
    </article>
  );
}
