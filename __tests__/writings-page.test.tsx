import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import WritingsPage from "@/app/writings/page";
import { GET } from "@/app/writings/feed.xml/route";
import { getWritings } from "@/lib/writings-source";
import { fixtureWritings } from "./fixtures/writings";

vi.mock("@/lib/writings-source", () => ({ getWritings: vi.fn() }));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

beforeEach(() => vi.mocked(getWritings).mockResolvedValue(fixtureWritings));
afterEach(cleanup);

test("is not found while there are no Writings", async () => {
  vi.mocked(getWritings).mockResolvedValue([]);
  await expect(WritingsPage()).rejects.toThrow("NEXT_NOT_FOUND");
});

test("shows the title, intro and an RSS feed link", async () => {
  render(await WritingsPage());
  expect(
    screen.getByRole("heading", { level: 1, name: "Writings" }),
  ).toBeDefined();
  expect(
    screen.getByText(
      "Essays on learning, building things, and being a student who codes. Roughly one a month.",
    ),
  ).toBeDefined();
  expect(
    screen.getByRole("link", { name: "RSS feed" }).getAttribute("href"),
  ).toBe("/writings/feed.xml");
});

test("features the latest essay with date, reading time, summary and tags", async () => {
  render(await WritingsPage());
  const card = screen.getByRole("article");
  expect(card.querySelector("p")?.textContent).toBe(
    "Latest · 18 Oct 2026 · 6 min read",
  );
  expect(
    within(card).getByRole("heading", { name: "Fixture latest essay" }),
  ).toBeDefined();
  expect(within(card).getByText("Latest summary.")).toBeDefined();
  expect(
    within(card)
      .getAllByRole("listitem")
      .map((t) => t.textContent),
  ).toEqual(["alpha", "beta"]);
  expect(
    within(card)
      .getByRole("link", { name: "Read the essay →" })
      .getAttribute("href"),
  ).toBe("/writings/latest");
});

test("lists the rest by year, newest first, without repeating the featured essay", async () => {
  render(await WritingsPage());
  const y2026 = screen.getByRole("region", { name: "2026" });
  expect(
    within(y2026)
      .getAllByRole("listitem")
      .map((r) => r.textContent),
  ).toEqual([
    "Second essay02 Aug 2026",
    "Third essay21 Jun 2026",
    "Fourth essay03 Apr 2026",
  ]);
  const y2025 = screen.getByRole("region", { name: "2025" });
  expect(
    within(y2025)
      .getAllByRole("listitem")
      .map((r) => r.textContent),
  ).toEqual(["Older essay14 Dec 2025"]);
});

test("feed route returns an RSS feed of the Writings", async () => {
  const res = await GET();
  expect(res.headers.get("Content-Type")).toMatch(/rss\+xml/);
  const xml = await res.text();
  expect(xml).toContain("<title>Fixture latest essay</title>");
  expect(xml).toContain("<link>https://fitzmartin.pages.dev/writings/latest</link>");
  expect(xml.match(/<item>/g)).toHaveLength(5);
});

test("feed route is 404 while there are no Writings", async () => {
  vi.mocked(getWritings).mockResolvedValue([]);
  const res = await GET();
  expect(res.status).toBe(404);
});
