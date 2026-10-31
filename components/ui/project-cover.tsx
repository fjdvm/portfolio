import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectCover({ project }: { project: Project }) {
  const { cover } = project;

  if (cover.kind === "photo") {
    return (
      <figure className="mb-3">
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: cover.position }}
          />
        </div>
        <figcaption className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Photo: {cover.credit}
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      data-testid="cover-pattern"
      aria-hidden="true"
      className="mb-3 aspect-video rounded-md"
      style={{
        color: cover.color,
        backgroundColor: "color-mix(in srgb, currentColor 8%, transparent)",
        backgroundImage:
          "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
        backgroundSize: "16px 16px",
      }}
    />
  );
}
