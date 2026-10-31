import { readdir } from "node:fs/promises";
import path from "node:path";
import { sortWritings, type Writing } from "@/lib/writings";

const dir = path.join(process.cwd(), "content/writings");

/** Every Writing, newest first. Each MDX file exports `meta`. */
export async function getWritings(): Promise<Writing[]> {
  "use cache";
  const files = await readdir(dir).catch(() => []);
  const slugs = files
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.slice(0, -".mdx".length));
  const writings = await Promise.all(
    slugs.map(async (slug) => {
      const { meta } = await import(`@/content/writings/${slug}.mdx`);
      return { slug, ...meta } as Writing;
    }),
  );
  return sortWritings(writings);
}
