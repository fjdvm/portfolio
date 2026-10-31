import { site } from "@/lib/site";

const glance = [
  {
    label: "Highlight",
    value: "Champion & Most Innovative Prototype · PUP Hackathon 2026, with AGAPAI",
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
    </section>
  );
}
