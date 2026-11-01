"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import HalftoneReveal from "./halftone-reveal";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Canvas props take colour strings, so these mirror --ink and --paper.
const INK = "#1d1d1f";
const PAPER = "#f5f5f7";

export type CoverArtSize = "card" | "thumb" | "figure";

const SIZES = {
  card: { sizes: "(min-width: 768px) 50vw, 100vw", cell: 7, reveal: 100 },
  thumb: { sizes: "56px", cell: 3, reveal: 28 },
  // Images inside an essay: dots ≈7px, revealed around the cursor.
  figure: { sizes: "(min-width: 768px) 640px, 100vw", cell: 7, reveal: 100 },
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

// Essay figures only: muted halftone, revealed around the cursor. Work photos use ShinePhoto.
export function PhotoArt({ src, alt }: { src: string; alt: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const { sizes, cell, reveal } = SIZES.figure;

  if (reduceMotion) {
    return (
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    );
  }
  return (
    <div role="img" aria-label={alt} className="size-full">
      <HalftoneReveal
        src={src}
        fit="cover"
        focusY={0.5}
        mode="mono"
        cellSize={cell}
        angle={45}
        inkColor={INK}
        paperColor={PAPER}
        contrast={1.15}
        revealRadius={reveal}
        clickBurst
        intro={false}
      />
    </div>
  );
}

// Generated cover for a Work with no photo: a colour gradient drawn as dots at rest,
// revealed in full colour around the cursor. Under reduced motion it is the plain gradient.
const GRADIENT_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="696" height="432">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" stop-color="#ff5f6d"/><stop offset=".35" stop-color="#ffc371"/>` +
      `<stop offset=".7" stop-color="#47c9e5"/><stop offset="1" stop-color="#7b5cff"/>` +
      `</linearGradient></defs><rect width="696" height="432" fill="url(#g)"/></svg>`,
  );
const GRADIENT_CSS =
  "linear-gradient(135deg, #ff5f6d 0%, #ffc371 35%, #47c9e5 70%, #7b5cff 100%)";

export function GradientArt({ size }: { size: "card" | "thumb" }) {
  const reduceMotion = usePrefersReducedMotion();
  const { cell, reveal } = SIZES[size];

  if (reduceMotion) {
    return <div className="size-full" style={{ backgroundImage: GRADIENT_CSS }} />;
  }
  return (
    <HalftoneReveal
      src={GRADIENT_SVG}
      fit="cover"
      mode="color"
      cellSize={cell}
      angle={45}
      inkColor={INK}
      paperColor={PAPER}
      revealRadius={reveal}
      clickBurst
      intro={false}
    />
  );
}
