import type { Work } from "@/lib/works";
import Image from "next/image";
import { PatternArt } from "./cover-art";
import { ShinePhoto } from "./shine-photo";
import StarBorder from "./star-border";

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

  if (cover.kind === "photo" && size === "hero") {
    // A star circles the frame, like the award badge; the photo itself stays still.
    return (
      <StarBorder
        as="div"
        theme="light"
        color="#0a0a0a"
        duration={6}
        radius={14}
        thickness={1}
        glow={0}
        hover="none"
        clickPulse={false}
        backgroundColor="#f5f5f7"
        borderColor="#c7c7cc"
        className={`!block !p-0 w-full overflow-hidden ${box}`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 768px) 720px, 100vw"
          className="object-contain"
          style={{ objectPosition: cover.position }}
        />
      </StarBorder>
    );
  }

  if (cover.kind === "photo") {
    return (
      <figure className={thumb ? "size-14 shrink-0" : undefined}>
        <div className={`relative overflow-hidden ${box}`}>
          {thumb ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="56px"
              className="object-cover"
              style={{ objectPosition: cover.position }}
            />
          ) : (
            <ShinePhoto
              src={cover.src}
              alt={cover.alt}
              position={cover.position}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
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
          {work.title}
        </span>
      )}
    </div>
  );
}
