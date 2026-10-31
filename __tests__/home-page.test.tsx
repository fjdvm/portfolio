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

test("intro states the Owner's work and interests, with no draft note", () => {
  render(<Home />);
  expect(
    screen.getByText(
      "I'm a PUP student who builds web and mobile apps and small tools. I lead development of a client system, and I'm growing more interested in AI, cloud, and backend engineering.",
    ),
  ).toBeDefined();
  expect(screen.queryByText(/draft/i)).toBeNull();
});

test("selected projects list CREOMS, AGAPAI, INGAT Remit in order with Covers and an All projects link", () => {
  render(<Home />);
  const section = screen.getByRole("region", { name: "Selected projects" });
  const rows = within(section).getAllByRole("listitem");
  expect(rows.map((r) => r.querySelector("h3")?.textContent)).toEqual([
    "CREOMS",
    "AGAPAI",
    "INGAT Remit",
  ]);
  expect(rows.map((r) => r.querySelector("time")?.textContent)).toEqual(["2026", "2026", "2026"]);
  expect(within(rows[0]).getByTestId("cover-pattern")).toBeDefined();
  expect(within(rows[1]).getByRole("img", { name: /Champion/ })).toBeDefined();
  expect(within(rows[2]).getByRole("img", { name: /Stellar APAC/ })).toBeDefined();
  expect(
    within(section).getByRole("link", { name: /All projects/ }).getAttribute("href"),
  ).toBe("/projects");
});

test("events lists exactly PUP Hackathon 2026 and Stellar APAC Hackathon", () => {
  render(<Home />);
  const section = screen.getByRole("region", { name: "Events & community" });
  const rows = within(section).getAllByRole("listitem");
  expect(rows.map((r) => r.textContent)).toEqual([
    "Oct 2026PUP Hackathon 2026Champion and Most Innovative Prototype · AGAPAI",
    "Jul 2026Stellar APAC HackathonINGAT Remit",
  ]);
});

test("has no Writings section or link", () => {
  render(<Home />);
  expect(screen.queryByText(/writings?/i)).toBeNull();
});
