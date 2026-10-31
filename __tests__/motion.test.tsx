import { afterEach, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

// jsdom has no WebGL; PatternWaves renders its canvas through ogl.
vi.mock("@/components/ui/pattern-waves", () => ({ default: () => null }));
import Home from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import { mockMatchMedia } from "../vitest.setup";

const motionPref = vi.hoisted(() => ({ reduce: true }));
vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useReducedMotion: () => motionPref.reduce,
}));

afterEach(cleanup);

test.each([
  ["Home", Home, "Hi, I'm Fitz."],
  ["Projects", ProjectsPage, "Projects"],
])(
  "%s with reduced motion shows the title and content immediately",
  (_name, Page, title) => {
    mockMatchMedia(true);
    motionPref.reduce = true;
    const { container } = render(<Page />);
    const h1 = screen.getByRole("heading", { level: 1, name: title });
    expect(h1.querySelector("[aria-hidden]")).toBeNull();
    expect(h1.textContent).toBe(title);
    for (const el of container.querySelectorAll<HTMLElement>(".invisible")) {
      expect(el.style.visibility).toBe("visible");
      expect(el.style.opacity).not.toBe("0");
    }
  },
);

test("Home title animates by word yet stays one accessible heading", () => {
  mockMatchMedia(false);
  motionPref.reduce = false;
  render(<Home />);
  const h1 = screen.getByRole("heading", { level: 1, name: "Hi, I'm Fitz." });
  expect(h1.querySelectorAll("[aria-hidden='true']").length).toBe(3);
});
