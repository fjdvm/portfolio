"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import HalftoneReveal from "./halftone-reveal";
import PatternWaves from "./pattern-waves";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

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

export function ProjectCover({
  project,
  size = "card",
}: {
  project: Project;
  size?: "card" | "thumb";
}) {
  const { cover } = project;
  const thumb = size === "thumb";
  const reduceMotion = usePrefersReducedMotion();
  const box = thumb
    ? "size-14 rounded-lg"
    : "aspect-[348/216] rounded-xl";

  if (cover.kind === "photo") {
    return (
      <figure className={thumb ? "size-14 shrink-0" : undefined}>
        <div className={`relative overflow-hidden ${box}`}>
          {reduceMotion ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes={thumb ? "56px" : "(min-width: 768px) 50vw, 100vw"}
              className="object-cover"
              style={{ objectPosition: cover.position }}
            />
          ) : (
            <div role="img" aria-label={cover.alt} className="size-full">
              <HalftoneReveal
                src={cover.src}
                cellSize={thumb ? 3 : 7}
                angle={45}
                inkColor="#1d1d1f"
                paperColor="#f5f5f7"
                contrast={1.15}
                revealRadius={thumb ? 28 : 100}
                intro={false}
              />
            </div>
          )}
        </div>
        <figcaption className={thumb ? "sr-only" : "mt-1 text-xs text-muted"}>
          Photo: {cover.credit}
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      data-testid="cover-pattern"
      aria-hidden="true"
      className={`relative overflow-hidden ${box} ${thumb ? "shrink-0" : ""}`}
    >
      <PatternWaves
        pattern="dot"
        spacing={thumb ? 5 : 9}
        speed={0.3}
        scale={0.5}
        depth={1.5}
        shine={0}
        light={1}
        contrast={1.2}
        color="#1d1d1f"
        backgroundColor="#e8e8ed"
        fade="none"
        interactive={false}
        intro={false}
      />
      {!thumb && (
        <span className="absolute bottom-3.5 left-3.5 rounded-lg bg-surface px-3 pb-[9px] pt-2 font-serif text-xl font-medium leading-[normal] text-ink">
          {project.title}
        </span>
      )}
    </div>
  );
}
