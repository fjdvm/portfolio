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

export type CoverArtSize = "card" | "thumb";

const SIZES = {
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

  if (reduceMotion) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    );
  }
  return (
    <div role="img" aria-label={alt} className="size-full">
      <HalftoneReveal
        src={src}
        cellSize={cell}
        angle={45}
        inkColor={INK}
        paperColor={PAPER}
        contrast={1.15}
        revealRadius={reveal}
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
