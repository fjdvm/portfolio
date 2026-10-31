import type { Writing } from "@/lib/writings";

// Fixture Writings only; the Figma essay text is placeholder and never ships.
export const fixtureWritings: Writing[] = [
  {
    slug: "latest",
    title: "Fixture latest essay",
    date: "2026-10-18",
    summary: "Latest summary.",
    tags: ["alpha", "beta"],
    readingTime: 6,
  },
  {
    slug: "second",
    title: "Second essay",
    date: "2026-08-02",
    summary: "Second summary.",
    tags: [],
    readingTime: 3,
  },
  {
    slug: "third",
    title: "Third essay",
    date: "2026-06-21",
    summary: "Third summary.",
    tags: [],
    readingTime: 4,
  },
  {
    slug: "fourth",
    title: "Fourth essay",
    date: "2026-04-03",
    summary: "Fourth summary.",
    tags: [],
    readingTime: 5,
  },
  {
    slug: "older",
    title: "Older essay",
    date: "2025-12-14",
    summary: "Older summary.",
    tags: [],
    readingTime: 2,
  },
];
