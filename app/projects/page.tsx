import type { Metadata } from "next";
import AnimatedContent from "@/components/ui/animated-content";
import BlurText from "@/components/ui/blur-text";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <section className="pt-[88px]">
      <BlurText
        as="h1"
        text="Projects"
        trigger="load"
        delay={100}
        className="font-serif text-[44px] leading-[52px] tracking-[-0.66px]"
      />
      <p className="mt-3 text-[17px] leading-7 text-ink2">
        Things I&apos;ve built for hackathons, research, and a real client.
      </p>
      <AnimatedContent
        distance={24}
        stagger={0.08}
        className="mt-9 grid gap-x-6 gap-y-11 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </AnimatedContent>
    </section>
  );
}
