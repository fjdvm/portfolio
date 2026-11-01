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

// A Work photo in full colour with a soft white gradient highlight on its inside rim. The highlight
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
  const spot = useRef<HTMLDivElement>(null);

  function follow(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const box = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (box.left + box.width / 2);
    const dy = e.clientY - (box.top + box.height / 2);
    // Conic angles run clockwise from the top.
    const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (spot.current) {
      spot.current.style.setProperty("--shine-x", `${e.clientX - box.left}px`);
      spot.current.style.setProperty("--shine-y", `${e.clientY - box.top}px`);
      spot.current.dataset.on = "true";
    }
    const el = rim.current;
    if (!el) return;
    el.dataset.follow = "true";
    el.style.setProperty("--shine-angle", `${angle}deg`);
  }

  function rest() {
    if (spot.current) delete spot.current.dataset.on;
    const el = rim.current;
    if (!el) return;
    delete el.dataset.follow;
    el.style.removeProperty("--shine-angle");
  }

  return (
    <div
      className="relative size-full rounded-[inherit]"
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
        aria-hidden="true"
        data-static={reduceMotion ? "true" : undefined}
        className="shine-sheen pointer-events-none absolute inset-0 rounded-[inherit]"
      />
      <div
        ref={spot}
        aria-hidden="true"
        className="shine-spot pointer-events-none absolute inset-0 rounded-[inherit]"
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
