import type { Metadata } from "next";
import BlurText from "@/components/ui/blur-text";
import AnimatedContent from "@/components/ui/animated-content";
import { WorkCard } from "@/components/ui/work-card";
import { works } from "@/lib/works";

export const metadata: Metadata = { title: "Works" };

export default function WorksPage() {
  return (
    <section className="pt-[88px]">
      <BlurText
        as="h1"
        text="Works"
        trigger="load"
        delay={100}
        className="font-serif text-[44px] leading-[52px] tracking-[-0.66px]"
      />
      <p className="mt-3 text-[17px] leading-7 text-ink2">
        Things I&apos;ve built for class, for hackathons, and for fun. Most are
        small; a few are still going.
      </p>
      <AnimatedContent
        distance={24}
        stagger={0.08}
        className="mt-9 grid gap-x-6 gap-y-11 sm:grid-cols-2"
      >
        {works.map((work) => (
          <WorkCard key={work.title} work={work} />
        ))}
      </AnimatedContent>
    </section>
  );
}
