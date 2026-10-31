import { ProjectCover } from "@/components/ui/project-cover";
import Link from "next/link";
import { events, selectedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

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
      <div
        aria-hidden="true"
        className="h-px flex-1 bg-line"
      />
      {children}
    </div>
  );
}

const glance = [
  {
    label: "Highlight",
    value:
      "Champion & Most Innovative Prototype · PUP Hackathon 2026, with AGAPAI",
  },
  { label: "Now", value: "Leading CREOMS development" },
  {
    label: "Studying",
    value: "Polytechnic University of the Philippines, expected 2027",
  },
];

export default function Home() {
  return (
    <section className="pt-[104px]">
      <h1 className="font-serif text-[52px] leading-[60px] tracking-[-1.04px]">
        Hi, I&apos;m Fitz.
      </h1>
      <p className="mt-5 text-lg leading-[30px] text-ink2">
        I&apos;m a PUP student who builds web and mobile apps and small tools. I
        lead development of a client system, and I&apos;m growing more
        interested in AI, cloud, and backend engineering.
      </p>
      <nav aria-label="Elsewhere" className="mt-5">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[15px] leading-[normal]">
          {site.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div
        role="group"
        aria-label="At a glance"
        className="mt-11 rounded-xl border border-line bg-surface px-5 py-[18px]"
      >
        <dl className="flex flex-col gap-3.5">
          {glance.map((row) => (
            <div key={row.label} className="flex items-center gap-4">
              <dt className="w-[84px] shrink-0 font-mono text-xs leading-[normal] text-faint">
                {row.label}
              </dt>
              <dd className="text-[15px] leading-[normal] text-ink2">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section aria-labelledby="selected-projects" className="mt-16">
        <SectionHeader id="selected-projects" title="Selected projects">
          <Link href="/projects" className="text-[13px] leading-[normal] text-muted">
            All projects →
          </Link>
        </SectionHeader>
        <ul className="mt-2">
          {selectedProjects.map((project) => (
            <li
              key={project.title}
              className="flex items-center gap-4 border-b border-line py-3.5 last:border-b-0"
            >
              <ProjectCover project={project} size="thumb" />
              <div className="min-w-0 flex-1">
                <h3 className="font-medium leading-[normal] text-ink">{project.title}</h3>
                <p className="mt-[3px] line-clamp-2 text-sm leading-5 text-muted">
                  {project.summary}
                </p>
              </div>
              <time className="font-mono text-[13px] leading-[normal] text-faint">
                {project.year}
              </time>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="events" className="mt-14">
        <SectionHeader id="events" title="Events & community" />
        <ul className="mt-2">
          {events.map((event) => (
            <li key={event.title} className="flex gap-4 py-2.5">
              <span className="w-[84px] shrink-0 font-mono text-[13px] leading-[22px] text-faint">
                {event.date}
              </span>
              <div>
                <p className="text-[15px] leading-[22px] text-ink">{event.title}</p>
                <p className="mt-0.5 text-sm leading-5 text-muted">
                  {event.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
