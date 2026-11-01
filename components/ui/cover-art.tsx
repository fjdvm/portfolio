"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import HalftoneReveal from "./halftone-reveal";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Canvas props take colour strings, so these mirror --ink and --paper.
const INK = "#1d1d1f";
const PAPER = "#f5f5f7";
// The no-photo pattern rests as soft gray dots rather than full ink.
const SOFT_INK = "#a1a1a6";

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

// Generated cover for a Work with no photo: a colourful Bauhaus-style tile pattern, drawn as
// mono dots at rest and revealed in full colour around the cursor. Under reduced motion it is
// the plain pattern.
const W = 696;
const H = 432;
const TILE = 72;
const PATTERN_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
  `<defs>` +
  `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
  `<stop offset="0" stop-color="#ff5f6d"/><stop offset=".4" stop-color="#ffc371"/>` +
  `<stop offset=".75" stop-color="#47c9e5"/><stop offset="1" stop-color="#7b5cff"/>` +
  `</linearGradient>` +
  `<pattern id="t" width="${TILE * 2}" height="${TILE * 2}" patternUnits="userSpaceOnUse">` +
  `<rect width="${TILE}" height="${TILE}" fill="#1b1464"/>` +
  `<circle cx="${TILE}" cy="${TILE}" r="${TILE}" fill="#fff4d6"/>` +
  `<circle cx="${TILE}" cy="${TILE}" r="${TILE * 0.55}" fill="#ff4d6d"/>` +
  `<circle cx="${TILE}" cy="${TILE}" r="${TILE * 0.22}" fill="#1b1464"/>` +
  `<rect x="${TILE}" width="${TILE}" height="${TILE}" fill="#00b4a6"/>` +
  `<path d="M${TILE} ${TILE} V0 A${TILE} ${TILE} 0 0 1 ${TILE * 2} ${TILE} Z" fill="#ffd23f"/>` +
  `<rect y="${TILE}" width="${TILE}" height="${TILE}" fill="#ffd23f"/>` +
  `<path d="M0 ${TILE * 2} V${TILE} A${TILE} ${TILE} 0 0 1 ${TILE} ${TILE * 2} Z" fill="#7b5cff"/>` +
  `<rect x="${TILE}" y="${TILE}" width="${TILE}" height="${TILE}" fill="#fff4d6"/>` +
  `<circle cx="${TILE * 1.5}" cy="${TILE * 1.5}" r="${TILE * 0.38}" fill="#1b1464"/>` +
  `</pattern>` +
  `</defs>` +
  `<rect width="${W}" height="${H}" fill="url(#g)"/>` +
  `<rect width="${W}" height="${H}" fill="url(#t)"/>` +
  `</svg>`;
const PATTERN_SRC = "data:image/svg+xml," + encodeURIComponent(PATTERN_SVG);
const PATTERN_CSS = `url("${PATTERN_SRC}") center / cover`;

export function PatternArt({ size }: { size: "card" | "thumb" }) {
  const reduceMotion = usePrefersReducedMotion();
  const { cell, reveal } = SIZES[size];

  if (reduceMotion) {
    return <div className="size-full" style={{ background: PATTERN_CSS }} />;
  }
  return (
    <HalftoneReveal
      src={PATTERN_SRC}
      fit="cover"
      mode="mono"
      cellSize={cell}
      angle={45}
      inkColor={SOFT_INK}
      paperColor={PAPER}
      contrast={1.15}
      revealRadius={reveal}
      clickBurst
      intro={false}
    />
  );
}
