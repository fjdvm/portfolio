import type { ComponentType, PropsWithChildren } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import EssayPage, { generateStaticParams } from "@/app/writings/[slug]/page";
import { getWritingBody, getWritings } from "@/lib/writings-source";
import { useMDXComponents } from "@/mdx-components";
import { mockMatchMedia } from "../vitest.setup";
import { fixtureWritings } from "./fixtures/writings";

// jsdom has no WebGL; the halftone canvas is replaced by a marker.
vi.mock("@/components/ui/halftone-reveal", () => ({
  default: () => <canvas data-testid="halftone" />,
}));
vi.mock("@/lib/writings-source", () => ({
  getWritings: vi.fn(),
  getWritingBody: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

// Fixture body only; the Figma essay text is placeholder and never ships.
function FixtureBody() {
  const {
    h2: H2,
    p: P,
    blockquote: Q,
    Figure,
  } = useMDXComponents() as Record<
    "h2" | "p" | "blockquote" | "Figure",
    ComponentType<PropsWithChildren<Record<string, unknown>>>
  >;
  return (
    <>
      <P>Fixture paragraph.</P>
      <H2>Fixture heading</H2>
      <Q>
        <P>Fixture quote.</P>
      </Q>
      <Figure
        src="/fixture.jpg"
        alt="Fixture photo"
        caption="Fig. 1 — Fixture."
      />
    </>
  );
}

const page = (slug: string) =>
  EssayPage({ params: Promise.resolve({ slug }) } as never);

beforeEach(() => {
  mockMatchMedia(false);
  vi.mocked(getWritings).mockResolvedValue(fixtureWritings);
  vi.mocked(getWritingBody).mockResolvedValue(FixtureBody);
});
afterEach(cleanup);

test("is not found for an unknown slug, and while there are no Writings", async () => {
  await expect(page("nope")).rejects.toThrow("NEXT_NOT_FOUND");
  vi.mocked(getWritings).mockResolvedValue([]);
  await expect(page("latest")).rejects.toThrow("NEXT_NOT_FOUND");
});

test("shows back link, meta row, title, subtitle and body", async () => {
  render(await page("second"));
  expect(
    screen.getByRole("link", { name: "← All writings" }).getAttribute("href"),
  ).toBe("/writings");
  expect(screen.getByText(/02 Aug 2026/).closest("p")?.textContent).toBe(
    "02 Aug 2026 · 3 min read",
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "Second essay" }),
  ).toBeDefined();
  expect(screen.getByText("Second summary.")).toBeDefined();
  expect(screen.getByText("Fixture paragraph.")).toBeDefined();
  expect(
    screen.getByRole("heading", { level: 2, name: "Fixture heading" }),
  ).toBeDefined();
  expect(
    screen.getByText("Fixture quote.").closest("blockquote"),
  ).not.toBeNull();
});

test("lists tags in the meta row", async () => {
  render(await page("latest"));
  expect(screen.getAllByRole("listitem").map((t) => t.textContent)).toEqual([
    "alpha",
    "beta",
  ]);
});

test("links to the previous (older) and next (newer) Writing", async () => {
  render(await page("third"));
  const nav = screen.getByRole("navigation", { name: "More writings" });
  expect(
    within(nav)
      .getByRole("link", { name: /Previous/ })
      .getAttribute("href"),
  ).toBe("/writings/fourth");
  expect(
    within(nav).getByRole("link", { name: /Next/ }).getAttribute("href"),
  ).toBe("/writings/second");
});

test("the newest essay shows a disabled Next, the oldest has no Previous", async () => {
  render(await page("latest"));
  let nav = screen.getByRole("navigation", { name: "More writings" });
  expect(within(nav).queryByRole("link", { name: /Next/ })).toBeNull();
  expect(within(nav).getByText("Coming soon")).toBeDefined();
  cleanup();
  render(await page("older"));
  nav = screen.getByRole("navigation", { name: "More writings" });
  expect(within(nav).queryByRole("link", { name: /Previous/ })).toBeNull();
});

test("figures render the halftone image with its caption", async () => {
  render(await page("latest"));
  expect(screen.getByTestId("halftone")).toBeDefined();
  expect(screen.getByText("Fig. 1 — Fixture.").tagName).toBe("FIGCAPTION");
});

test("with reduced motion, figures show the image unprocessed", async () => {
  mockMatchMedia(true);
  render(await page("latest"));
  expect(screen.queryByTestId("halftone")).toBeNull();
  expect(screen.getByAltText("Fixture photo")).toBeDefined();
});

test("prerenders every Writing, or a slug that 404s while there are none", async () => {
  expect((await generateStaticParams()).map((p) => p.slug)).toEqual([
    "latest",
    "second",
    "third",
    "fourth",
    "older",
  ]);
  vi.mocked(getWritings).mockResolvedValue([]);
  const [placeholder] = await generateStaticParams();
  await expect(page(placeholder.slug)).rejects.toThrow("NEXT_NOT_FOUND");
});
