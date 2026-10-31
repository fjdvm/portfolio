import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedContent from "@/components/ui/animated-content";
import BlurText from "@/components/ui/blur-text";
import { FeaturedEssay, WritingRow } from "@/components/ui/writing-views";
import { feedPath, groupByYear } from "@/lib/writings";
import { getWritings } from "@/lib/writings-source";

export const metadata: Metadata = { title: "Writings" };

export default async function WritingsPage() {
  const writings = await getWritings();
  if (writings.length === 0) notFound();
  const [latest, ...rest] = writings;

  return (
    <section className="pt-[88px]">
      <div className="flex items-baseline justify-between gap-4">
        <BlurText
          as="h1"
          text="Writings"
          trigger="load"
          delay={100}
          className="font-serif text-[44px] leading-[52px] tracking-[-0.66px]"
        />
        <a
          href={feedPath}
          className="text-sm leading-[normal] text-muted underline"
        >
          RSS feed
        </a>
      </div>
      <p className="mt-3 text-[17px] leading-7 text-ink2">
        Essays on learning, building things, and being a student who codes.
        Roughly one a month.
      </p>
      <AnimatedContent distance={24} className="mt-10">
        <FeaturedEssay writing={latest} />
      </AnimatedContent>
      {groupByYear(rest).map(({ year, writings }, i) => (
        <AnimatedContent
          key={year}
          distance={24}
          className={i === 0 ? "mt-14" : "mt-10"}
        >
          <section aria-labelledby={`year-${year}`}>
            <h2
              id={`year-${year}`}
              className="font-serif text-[22px] italic leading-[normal] text-muted"
            >
              {year}
            </h2>
            <ul className="mt-2">
              {writings.map((writing) => (
                <li key={writing.slug}>
                  <WritingRow writing={writing} />
                </li>
              ))}
            </ul>
          </section>
        </AnimatedContent>
      ))}
    </section>
  );
}
