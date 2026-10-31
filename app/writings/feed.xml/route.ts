import { getWritings } from "@/lib/writings-source";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const escapeXml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export async function GET() {
  const writings = await getWritings();
  if (writings.length === 0) return new Response("Not found", { status: 404 });

  const origin = site.url;
  const items = writings
    .map((w) => {
      const url = `${origin}/writings/${w.slug}`;
      return `<item><title>${escapeXml(w.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(w.date).toUTCString()}</pubDate><description>${escapeXml(w.summary)}</description></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(site.name)} · Writings</title><link>${origin}/writings</link><description>Essays on learning, building things, and being a student who codes.</description>${items}</channel></rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
