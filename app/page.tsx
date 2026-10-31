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
      <h2 id={id} className="text-sm font-medium">
        {title}
      </h2>
      <div
        aria-hidden="true"
        className="h-px flex-1 bg-black/10 dark:bg-white/15"
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
    <section className="pt-12">
      <h1 className="font-serif text-5xl leading-[60px] tracking-tight">
        Hi, I&apos;m Fitz.
      </h1>
      <p className="mt-5 text-lg leading-[30px] text-zinc-700 dark:text-zinc-300">
        I&apos;m a PUP student who builds web and mobile apps and small tools,
        and I lead development of a client system.
      </p>
      <p className="mt-2 text-xs text-zinc-500">
        Draft intro for the Owner to review before release.
      </p>
      <nav aria-label="Elsewhere" className="mt-5">
        <ul className="flex gap-5 text-[15px]">
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
        className="mt-11 rounded-xl border border-black/10 px-5 py-[18px] dark:border-white/15"
      >
        <dl className="flex flex-col gap-3.5">
          {glance.map((row) => (
            <div key={row.label} className="flex items-center gap-4">
              <dt className="w-[84px] shrink-0 font-mono text-xs text-zinc-500">
                {row.label}
              </dt>
              <dd className="text-[15px] text-zinc-700 dark:text-zinc-300">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section aria-labelledby="selected-projects" className="mt-16">
        <SectionHeader id="selected-projects" title="Selected projects">
          <Link href="/projects" className="text-[13px] text-zinc-500">
            All projects →
          </Link>
        </SectionHeader>
        <ul className="mt-2">
          {selectedProjects.map((project) => (
            <li
              key={project.title}
              className="flex items-center gap-4 border-b border-black/10 py-3.5 last:border-b-0 dark:border-white/15"
            >
              <ProjectCover project={project} size="thumb" />
              <div className="min-w-0 flex-1">
                <h3 className="font-medium">{project.title}</h3>
                <p className="mt-[3px] line-clamp-2 text-sm leading-5 text-zinc-500">
                  {project.summary}
                </p>
              </div>
              <time className="font-mono text-[13px] text-zinc-400">
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
              <span className="w-[84px] shrink-0 font-mono text-[13px] leading-[22px] text-zinc-400">
                {event.date}
              </span>
              <div>
                <p className="text-[15px] leading-[22px]">{event.title}</p>
                <p className="text-sm leading-5 text-zinc-500">
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
