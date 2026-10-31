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
      <figure className={thumb ? "size-14 shrink-0" : undefined}>
        <div
          className={`relative overflow-hidden ${thumb ? "size-14 rounded-lg" : "aspect-[348/216] rounded-[10px]"}`}
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
        <figcaption className={thumb ? "sr-only" : "mt-1 text-xs text-muted"}>
          Photo: {cover.credit}
        </figcaption>
      </figure>
    );
  }

  const dot = thumb ? 2.5 : 5;
  const grid = thumb ? 14 : 28;
  return (
    <div
      data-testid="cover-pattern"
      aria-hidden="true"
      className={`cover-pattern ${
        thumb
          ? "size-14 shrink-0 rounded-lg"
          : "aspect-[348/216] rounded-[10px]"
      }`}
      style={
        {
          backgroundColor: `var(--surface)`,
          backgroundImage: `radial-gradient(circle, var(--faint) ${dot}px, transparent ${dot + 0.5}px), radial-gradient(circle, color-mix(in srgb, var(--faint) 55%, transparent) ${dot * 0.6}px, transparent ${dot * 0.6 + 0.5}px)`,
          backgroundSize: `${grid * 2}px ${grid * 2}px, ${grid * 2}px ${grid * 2}px`,
          "--tile": `${grid * 2}px`,
          "--p1": `${grid / 2}px`,
          "--p2": `${grid * 1.5}px`,
        } as React.CSSProperties
      }
    />
  );
}
