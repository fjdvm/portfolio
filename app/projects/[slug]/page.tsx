import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2 text-xs">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-black/10 px-2 py-0.5 dark:border-white/15">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
