import type { Project } from "@/lib/projects";
import { PatternArt, PhotoArt } from "./cover-art";

export function ProjectCover({
  project,
  size = "card",
  showCredit = true,
}: {
  project: Project;
  size?: "card" | "thumb";
  showCredit?: boolean;
}) {
  const { cover } = project;
  const thumb = size === "thumb";
  const box = thumb ? "size-14 rounded-lg" : "aspect-[348/216] rounded-xl";

  if (cover.kind === "photo") {
    return (
      <figure className={thumb ? "size-14 shrink-0" : undefined}>
        <div className={`relative overflow-hidden ${box}`}>
          <PhotoArt
            src={cover.src}
            alt={cover.alt}
            position={cover.position}
            size={size}
          />
        </div>
        {showCredit && (
          <figcaption className={thumb ? "sr-only" : "mt-1 text-xs text-muted"}>
            Photo: {cover.credit}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <div
      data-testid="cover-pattern"
      aria-hidden="true"
      className={`relative overflow-hidden ${box} ${thumb ? "shrink-0" : ""}`}
    >
      <PatternArt size={size} />
      {!thumb && (
        <span className="absolute bottom-3.5 left-3.5 rounded-lg bg-surface px-3 pb-[9px] pt-2 font-serif text-xl font-medium leading-[normal] text-ink">
          {project.title}
        </span>
      )}
    </div>
  );
}
