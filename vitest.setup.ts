import { vi } from "vitest";

// jsdom has no matchMedia; GSAP and motion both need it. Default to reduced
// motion so tests see final content immediately; tests can override.
export function mockMatchMedia(reduce: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: reduce && query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

mockMatchMedia(true);

// jsdom has no WebGL; PatternWaves renders its canvas through ogl.
vi.mock("@/components/ui/pattern-waves", () => ({
  default: () => null,
}));
