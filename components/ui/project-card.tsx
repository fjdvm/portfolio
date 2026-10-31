import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-lg border border-black/10 p-4 transition-colors hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/[.06]"
    >
      <h2 className="font-semibold">{project.title}</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {project.summary}
      </p>
    </Link>
  );
}
