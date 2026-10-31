import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import ProjectsPage from "@/app/projects/page";

afterEach(cleanup);

function cards() {
  return screen.getAllByRole("article");
}

function card(title: string) {
  return within(
    cards().find((c) => within(c).queryByRole("heading", { name: title }))!,
  );
}

test("shows the intro line", () => {
  render(<ProjectsPage />);
  expect(
    screen.getByText(
      "Web and mobile apps I've built for hackathons, research, and a real client.",
    ),
  ).toBeDefined();
});

test("lists the four Projects in order", () => {
  render(<ProjectsPage />);
  const titles = cards().map(
    (c) => within(c).getByRole("heading").textContent,
  );
  expect(titles).toEqual(["CREOMS", "AGAPAI", "INGAT Remit", "PACE"]);
});

test("each card shows year, summary and stack tags", () => {
  render(<ProjectsPage />);
  const expected: Record<string, string[]> = {
    CREOMS: ["next.js", "typescript", "neon"],
    AGAPAI: ["react native", "next.js", "convex", "maplibre"],
    "INGAT Remit": ["next.js", "stellar", "soroban"],
    PACE: ["next.js", "typescript", "supabase"],
  };
  for (const [title, tags] of Object.entries(expected)) {
    const c = card(title);
    expect(c.getByText("2026")).toBeDefined();
    for (const tag of tags) expect(c.getByText(tag)).toBeDefined();
  }
});

test("CREOMS shows launch status and no links", () => {
  render(<ProjectsPage />);
  const c = card("CREOMS");
  expect(c.getByText("Launching Nov 2026")).toBeDefined();
  expect(c.queryAllByRole("link")).toHaveLength(0);
});

test("AGAPAI and INGAT Remit link Live only", () => {
  render(<ProjectsPage />);
  for (const title of ["AGAPAI", "INGAT Remit"]) {
    const links = card(title).getAllByRole("link");
    expect(links.map((l) => l.textContent)).toEqual(["Live"]);
  }
});

test("PACE links Live and Code", () => {
  render(<ProjectsPage />);
  const links = card("PACE").getAllByRole("link");
  expect(links.map((l) => l.textContent)).toEqual(["Live", "Code"]);
});

test("has no filter chips and never names the client", () => {
  const { container } = render(<ProjectsPage />);
  expect(screen.queryByRole("button")).toBeNull();
  expect(container.textContent).not.toMatch(/bren\s*raphael/i);
});

test("summaries state the Owner's role and the award", () => {
  render(<ProjectsPage />);
  expect(card("CREOMS").getByText(/I lead its development/)).toBeDefined();
  expect(
    card("AGAPAI").getByText(
      /Champion and Most Innovative Prototype.*team of five.*AI and lead developer/,
    ),
  ).toBeDefined();
});

test("AGAPAI and INGAT Remit show a photo Cover with credit and no pattern", () => {
  render(<ProjectsPage />);
  const expected: Record<string, string> = {
    AGAPAI: "RISFI",
    "INGAT Remit": "Rise In and Stellar",
  };
  for (const [title, credit] of Object.entries(expected)) {
    const c = card(title);
    expect(c.getByRole("img")).toBeDefined();
    expect(c.getByText(`Photo: ${credit}`)).toBeDefined();
    expect(c.queryByTestId("cover-pattern")).toBeNull();
  }
});

test("CREOMS and PACE show the dot pattern and no photo or credit", () => {
  render(<ProjectsPage />);
  for (const title of ["CREOMS", "PACE"]) {
    const c = card(title);
    expect(c.getByTestId("cover-pattern")).toBeDefined();
    expect(c.queryByRole("img")).toBeNull();
    expect(c.queryByText(/^Photo:/)).toBeNull();
  }
});
