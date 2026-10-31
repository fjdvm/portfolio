import Image from "next/image";
import type { Project } from "@/lib/projects";
import { WinnerBadge } from "./winner-badge";

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
          {!thumb && project.badge && (
            <WinnerBadge
              label={project.badge}
              className="absolute left-3.5 top-3.5"
            />
          )}
        </div>
        <figcaption
          className={
            thumb ? "sr-only" : "mt-1 text-xs text-muted"
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
        thumb
          ? "size-14 shrink-0 rounded-lg"
          : "aspect-[348/216] rounded-[10px]"
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
