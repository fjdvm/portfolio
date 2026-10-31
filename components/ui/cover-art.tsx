"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import HalftoneReveal from "./halftone-reveal";
import PatternWaves from "./pattern-waves";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Canvas props take colour strings, so these mirror --ink, --paper and the
// pattern ground from the Figma component map (not a theme token).
const INK = "#1d1d1f";
const PAPER = "#f5f5f7";
const PATTERN_GROUND = "#e8e8ed";

export type CoverArtSize = "hero" | "card" | "thumb";

const SIZES = {
  // The whole portrait is contained in the frame, so dots are finer and nothing reveals.
  hero: { sizes: "(min-width: 768px) 720px, 100vw", cell: 4, reveal: 0, spacing: 9 },
  card: { sizes: "(min-width: 768px) 50vw, 100vw", cell: 7, reveal: 100, spacing: 9 },
  thumb: { sizes: "56px", cell: 3, reveal: 28, spacing: 5 },
} satisfies Record<CoverArtSize, object>;

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

// "top" or "center 18%" -> 0..1 vertical anchor, matching object-position.
function focusYFrom(position?: string) {
  if (!position) return 0.5;
  if (position.includes("top")) return 0;
  const percent = position.match(/(\d+(?:\.\d+)?)%\s*$/);
  return percent ? Number(percent[1]) / 100 : 0.5;
}

export function PhotoArt({
  src,
  alt,
  position,
  size,
}: {
  src: string;
  alt: string;
  position?: string;
  size: CoverArtSize;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { sizes, cell, reveal } = SIZES[size];
  const hero = size === "hero";

  if (reduceMotion) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={hero ? "object-contain" : "object-cover"}
        style={{ objectPosition: position }}
      />
    );
  }
  return (
    <div role="img" aria-label={alt} className="size-full">
      <HalftoneReveal
        src={src}
        fit={hero ? "contain" : "cover"}
        focusY={focusYFrom(position)}
        mode="color"
        cellSize={cell}
        angle={45}
        inkColor={INK}
        paperColor={PAPER}
        contrast={1.15}
        revealRadius={reveal}
        clickBurst={!hero}
        intro={false}
      />
    </div>
  );
}

export function PatternArt({ size }: { size: CoverArtSize }) {
  return (
    <PatternWaves
      pattern="dot"
      spacing={SIZES[size].spacing}
      speed={0.3}
      scale={0.5}
      depth={1.5}
      shine={0}
      light={1}
      color={INK}
      backgroundColor={PATTERN_GROUND}
      fade="none"
      interactive={false}
      intro={false}
    />
  );
}
