import type { Work } from "@/lib/works";
import { PatternArt } from "./cover-art";
import { ShinePhoto } from "./shine-photo";

export function WorkCover({
  work,
  size = "card",
  showCredit = true,
}: {
  work: Work;
  size?: "hero" | "card" | "thumb";
  showCredit?: boolean;
}) {
  const { cover } = work;
  const thumb = size === "thumb";
  const box = thumb
    ? "size-14 rounded-lg"
    : size === "hero"
      ? "h-[340px] rounded-[14px]"
      : "aspect-[348/216] rounded-xl";

  if (cover.kind === "photo") {
    return (
      <figure className={thumb ? "size-14 shrink-0" : undefined}>
        <div
          className={`relative overflow-hidden ${box} ${size === "hero" ? "border border-[#c7c7cc] bg-[#f5f5f7]" : ""}`}
        >
          <ShinePhoto
            src={cover.src}
            alt={cover.alt}
            position={cover.position}
            sizes={
              thumb
                ? "56px"
                : size === "hero"
                  ? "(min-width: 768px) 720px, 100vw"
                  : "(min-width: 768px) 50vw, 100vw"
            }
            fit={size === "hero" ? "contain" : "cover"}
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
      <PatternArt size={thumb ? "thumb" : "card"} />
    </div>
  );
}
