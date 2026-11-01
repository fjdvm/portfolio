import AnimatedContent from "@/components/ui/animated-content";
import BlurText from "@/components/ui/blur-text";
import { WorkCover } from "@/components/ui/work-cover";
import Link from "next/link";
import { events, works, selectedWorks } from "@/lib/works";
import { site } from "@/lib/site";
import EventPhotos from "@/components/ui/event-photos";
import { AwardBadge } from "@/components/ui/award-badge";
import { WritingRow } from "@/components/ui/writing-views";
import { formatDate } from "@/lib/writings";
import { getWritings } from "@/lib/writings-source";

function SectionHeader({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <h2 id={id} className="text-sm font-medium leading-[normal]">
        {title}
      </h2>
      <div aria-hidden="true" className="h-px flex-1 bg-line" />
      {children}
    </div>
  );
}

function ContactLink({
  label,
  text = label,
}: {
  label: string;
  text?: string;
}) {
  const link = site.links.find((l) => l.label === label)!;
  return (
    <a href={link.href} className="text-ink underline">
      {text}
    </a>
  );
}

const glance: { label: string; badge?: string; value: string }[] = [
  {
    label: "Highlight",
    badge: "Champion & Most Innovative Prototype",
    value: "PUP Hackathon 2026, with AGAPAI",
  },
  { label: "Now", value: "Leading CREOMS development" },
  {
    label: "Studying",
    value: "Polytechnic University of the Philippines, expected 2027",
  },
];

const hero = works.find((p) => p.title === "AGAPAI")!;

export default async function Home() {
  const [latest, ...older] = await getWritings();

  return (
    <section className="pt-[104px]">
      <BlurText
        as="h1"
        text="Hi, I'm Fitz."
        trigger="load"
        delay={100}
        className="font-serif text-[52px] leading-[60px] tracking-[-1.04px]"
      />
      <AnimatedContent distance={24} className="mt-5">
        <p className="text-lg leading-[30px] text-ink2">
          I&apos;m a PUP student who builds web and mobile apps and small tools.
          I lead development of a client system, and I&apos;m growing more
          interested in AI, cloud, and backend engineering. You can also find me
          on <ContactLink label="LinkedIn" />, <ContactLink label="GitHub" />,
          or <ContactLink label="Email" text="send me an email" />.
        </p>
      </AnimatedContent>
      {site.showHeroPhoto && (
        <AnimatedContent distance={24} className="mt-9">
          <figure>
            <WorkCover work={hero} size="hero" showCredit={false} />
            <figcaption className="mt-2.5 flex flex-wrap justify-between gap-x-4 font-mono text-xs leading-[normal] text-faint">
              <span>PUP Hackathon 2026 · Team AI Did It</span>
              {hero.cover.kind === "photo" && hero.cover.credit && (
                <span>Photo: {hero.cover.credit}</span>
              )}
            </figcaption>
          </figure>
        </AnimatedContent>
      )}
      <AnimatedContent distance={24} className="mt-11">
        <div
          role="group"
          aria-label="At a glance"
          className="overflow-x-clip rounded-xl border border-line bg-surface px-5 py-[18px]"
        >
          <dl className="flex flex-col gap-3.5">
            {glance.map((row) => (
              <div
                key={row.label}
                className={`flex gap-4 ${row.badge ? "items-start" : "items-center"}`}
              >
                <dt
                  className={`w-[84px] shrink-0 font-mono text-xs text-faint ${row.badge ? "leading-6" : "leading-5"}`}
                >
                  {row.label}
                </dt>
                <dd className="flex min-w-0 flex-1 flex-col items-start gap-1.5 text-[15px] leading-[normal] text-ink2">
                  {row.badge && <AwardBadge label={row.badge} />}
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </AnimatedContent>

      <AnimatedContent distance={24} className="mt-16">
        <section aria-labelledby="selected-works">
          <SectionHeader id="selected-works" title="Selected works">
            <Link
              href="/works"
              className="text-[13px] leading-[normal] text-muted"
            >
              All works →
            </Link>
          </SectionHeader>
          <ul className="mt-2 [&>li:nth-child(2)]:border-b">
            {selectedWorks.map((work) => (
              <li
                key={work.title}
                className="flex items-center gap-4 border-line py-3.5"
              >
                <WorkCover
                  work={work}
                  size="thumb"
                  showCredit={false}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium leading-[normal] text-ink">
                    {work.title}
                  </h3>
                  <p className="mt-[3px] line-clamp-2 text-sm leading-5 text-muted">
                    {work.summary}
                  </p>
                  {work.cover.kind === "photo" && work.cover.credit && (
                    <p className="mt-[3px] font-mono text-[11px] leading-[normal] text-faint">
                      Photo: {work.cover.credit}
                    </p>
                  )}
                </div>
                <time className="font-mono text-[13px] leading-[normal] text-faint">
                  {work.year}
                </time>
              </li>
            ))}
          </ul>
        </section>
      </AnimatedContent>

      {latest && (
        <AnimatedContent distance={24} className="mt-14">
          <section aria-labelledby="recent-writings">
            <SectionHeader id="recent-writings" title="Recent writings">
              <Link
                href="/writings"
                className="text-[13px] leading-[normal] text-muted"
              >
                All writings →
              </Link>
            </SectionHeader>
            <Link href={`/writings/${latest.slug}`} className="mt-5 block">
              <time
                dateTime={latest.date}
                className="block font-mono text-[13px] leading-[normal] text-faint"
              >
                {formatDate(latest.date)}
              </time>
              <h3 className="mt-1.5 font-serif text-2xl font-medium leading-8 tracking-[-0.12px] text-ink">
                {latest.title}
              </h3>
              <p className="mt-2 text-[15px] leading-6 text-ink2">
                {latest.summary}
              </p>
            </Link>
            <ul className="mt-3.5">
              {older.slice(0, 3).map((writing) => (
                <li key={writing.slug}>
                  <WritingRow writing={writing} />
                </li>
              ))}
            </ul>
          </section>
        </AnimatedContent>
      )}

      <AnimatedContent distance={24} className="mt-14">
        <section aria-labelledby="events">
          <SectionHeader id="events" title="Events & community" />
          <div className="mt-2">
            <EventPhotos />
          </div>
          <ul className="mt-3">
            {events.map((event) => (
              <li key={event.title} className="flex gap-4 py-2.5">
                <span className="w-[84px] shrink-0 font-mono text-[13px] leading-[22px] text-faint">
                  {event.date}
                </span>
                <div>
                  <p className="text-[15px] leading-[22px] text-ink">
                    {event.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-5 text-muted">
                    {event.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </AnimatedContent>
    </section>
  );
}
