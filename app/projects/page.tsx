import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <div className="mt-6 grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
