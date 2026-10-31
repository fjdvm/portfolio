import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <section className="pt-[88px]">
      <h1 className="font-serif text-[44px] leading-[52px] tracking-[-0.66px]">
        Projects
      </h1>
      <p className="mt-3 text-[17px] leading-7 text-ink2">
        Things I&apos;ve built for hackathons, research, and a real client.
      </p>
      <div className="mt-9 grid gap-x-6 gap-y-11 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
