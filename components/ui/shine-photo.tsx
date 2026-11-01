"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

// A Work photo in full colour with a warm gold highlight on its inside rim. The highlight
// sweeps slowly at rest and points at the cursor (or touch) while it is over the card.
export function ShinePhoto({
  src,
  alt,
  position,
  sizes,
  fit = "cover",
}: {
  src: string;
  alt: string;
  position?: string;
  sizes: string;
  fit?: "cover" | "contain";
}) {
  const reduceMotion = useReducedMotion();
  const rim = useRef<HTMLDivElement>(null);

  function follow(e: React.PointerEvent<HTMLDivElement>) {
    const el = rim.current;
    if (!el || reduceMotion) return;
    const box = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (box.left + box.width / 2);
    const dy = e.clientY - (box.top + box.height / 2);
    // Conic angles run clockwise from the top.
    const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    el.dataset.follow = "true";
    el.style.setProperty("--shine-angle", `${angle}deg`);
  }

  function rest() {
    const el = rim.current;
    if (!el) return;
    delete el.dataset.follow;
    el.style.removeProperty("--shine-angle");
  }

  return (
    <div
      className="relative size-full"
      onPointerDown={follow}
      onPointerMove={follow}
      onPointerUp={rest}
      onPointerLeave={rest}
      onPointerCancel={rest}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={fit === "contain" ? "object-contain" : "object-cover"}
        style={{ objectPosition: position }}
      />
      <div
        ref={rim}
        data-testid="photo-shine"
        aria-hidden="true"
        data-static={reduceMotion ? "true" : undefined}
        className="shine-rim pointer-events-none absolute inset-0 rounded-[inherit]"
      />
    </div>
  );
}
