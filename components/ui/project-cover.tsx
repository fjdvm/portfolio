import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectCover({
  project,
  size = "card",
}: {
  project: Project;
  size?: "card" | "thumb";
}) {
  const { cover } = project;
  const thumb = size === "thumb";

  if (cover.kind === "photo") {
    return (
      <figure className={thumb ? "size-14 shrink-0" : "mb-3"}>
        <div
          className={`relative overflow-hidden ${thumb ? "size-14 rounded-lg" : "aspect-video rounded-md"}`}
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={thumb ? "56px" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover"
            style={{ objectPosition: cover.position }}
          />
        </div>
        <figcaption
          className={
            thumb ? "sr-only" : "mt-1 text-xs text-zinc-600 dark:text-zinc-400"
          }
        >
          Photo: {cover.credit}
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      data-testid="cover-pattern"
      aria-hidden="true"
      className={
        thumb ? "size-14 shrink-0 rounded-lg" : "mb-3 aspect-video rounded-md"
      }
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
