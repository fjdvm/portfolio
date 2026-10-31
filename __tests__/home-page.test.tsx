import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import Home from "@/app/page";

afterEach(cleanup);

test("shows the heading", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1, name: "Hi, I'm Fitz." })).toBeDefined();
});

test("links to GitHub, LinkedIn and Email, with no résumé link", () => {
  render(<Home />);
  const links = within(screen.getByRole("navigation", { name: "Elsewhere" })).getAllByRole("link");
  expect(links.map((l) => [l.textContent, l.getAttribute("href")])).toEqual([
    ["GitHub", "https://github.com/fjdvm"],
    ["LinkedIn", "https://www.linkedin.com/in/fitzmartin"],
    ["Email", "mailto:jude.nitram08@gmail.com"],
  ]);
  expect(screen.queryByText(/résumé|resume|cv/i)).toBeNull();
});

test("info card rows match the Highlight, Now and Studying copy", () => {
  render(<Home />);
  const card = screen.getByRole("group", { name: "At a glance" });
  const rows = Array.from(card.querySelectorAll("dt")).map((dt) => [
    dt.textContent,
    dt.nextElementSibling?.textContent,
  ]);
  expect(rows).toEqual([
    ["Highlight", "Champion & Most Innovative Prototype · PUP Hackathon 2026, with AGAPAI"],
    ["Now", "Leading CREOMS development"],
    ["Studying", "Polytechnic University of the Philippines, expected 2027"],
  ]);
});

test("intro is flagged for the Owner's review", () => {
  render(<Home />);
  expect(screen.getByText(/draft.*owner to review/i)).toBeDefined();
});
