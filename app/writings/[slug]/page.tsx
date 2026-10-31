import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlurText from "@/components/ui/blur-text";
import { formatDate, neighbours, type Writing } from "@/lib/writings";
import { getWritingBody, getWritings } from "@/lib/writings-source";

export async function generateStaticParams() {
  const writings = await getWritings();
  // Cache Components rejects an empty list. While no Writing exists, a slug
  // that matches nothing keeps the build valid and the route 404s.
  return writings.length > 0
    ? writings.map(({ slug }) => ({ slug }))
    : [{ slug: "_none" }];
}

async function findWriting(slug: string) {
  const writings = await getWritings();
  const writing = writings.find((w) => w.slug === slug);
  if (!writing) notFound();
  return { writing, writings };
}

export async function generateMetadata({
  params,
}: PageProps<"/writings/[slug]">): Promise<Metadata> {
  const { writing } = await findWriting((await params).slug);
  return { title: writing.title, description: writing.summary };
}

function Neighbour({
  label,
  writing,
  align,
}: {
  label: string;
  writing?: Writing;
  align: "start" | "end";
}) {
  const box = `flex min-w-0 flex-col gap-1 rounded-[10px] border border-line px-4 py-3.5 leading-[normal] ${
    align === "end" ? "items-end text-right" : "items-start"
  }`;
  const caption = "font-mono text-xs text-faint";
  if (!writing) {
    // Nothing newer yet; the Figma shows a disabled "Coming soon" card.
    return align === "end" ? (
      <div className={box}>
        <span className={caption}>{label}</span>
        <span className="text-[15px] font-medium text-faint">Coming soon</span>
      </div>
    ) : (
      <div />
    );
  }
  return (
    <Link href={`/writings/${writing.slug}`} className={box}>
      <span className={caption}>{label}</span>
      <span className="text-[15px] font-medium text-ink">{writing.title}</span>
    </Link>
  );
}

export default async function EssayPage({
  params,
}: PageProps<"/writings/[slug]">) {
  const { slug } = await params;
  const { writing, writings } = await findWriting(slug);
  const Body = await getWritingBody(slug);
  const { previous, next } = neighbours(writings, slug);

  return (
    <article className="mx-auto max-w-[640px] pt-[72px]">
      <Link href="/writings" className="text-sm leading-[normal] text-muted">
        ← All writings
      </Link>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <p className="font-mono text-xs uppercase leading-[normal] tracking-[0.48px] text-faint">
          <time dateTime={writing.date}>{formatDate(writing.date)}</time> ·{" "}
          {writing.readingTime} min read
        </p>
        <ul className="flex flex-wrap gap-3">
          {writing.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-xs leading-[normal] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <BlurText
        as="h1"
        text={writing.title}
        trigger="load"
        delay={100}
        className="mt-4 font-serif text-[34px] leading-10 sm:text-[46px] sm:leading-[54px] tracking-[-0.69px] text-ink"
      />
      <p className="mt-4 font-serif text-[22px] italic leading-8 text-muted">
        {writing.summary}
      </p>
      <hr className="mt-9 border-line" />
      <div className="[&>:first-child]:mt-0 mt-9">
        <Body />
      </div>
      <hr className="mt-12 border-line" />
      <p className="mt-6 text-[15px] leading-6 text-muted">
        Thanks for reading. I write about once a month; the RSS feed is the
        easiest way to keep up.
      </p>
      <nav aria-label="More writings" className="mt-7 grid grid-cols-2 gap-4">
        <Neighbour label="← Previous" writing={previous} align="start" />
        <Neighbour label="Next →" writing={next} align="end" />
      </nav>
    </article>
  );
}
