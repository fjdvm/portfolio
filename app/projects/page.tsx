import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Web and mobile apps I&apos;ve built for hackathons, research, and a real
        client.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
