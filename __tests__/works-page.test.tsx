import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { mockMatchMedia } from "../vitest.setup";
import WorksPage from "@/app/works/page";

// jsdom has no WebGL; HalftoneReveal draws its canvas with WebGL.
vi.mock("@/components/ui/halftone-reveal", () => ({ default: () => null }));

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
  render(<WorksPage />);
  expect(
    screen.getByText(
      "Things I've built for class, for hackathons, and for fun. Most are small; a few are still going.",
    ),
  ).toBeDefined();
});

test("lists the four Works in order", () => {
  render(<WorksPage />);
  const titles = cards().map((c) => within(c).getByRole("heading").textContent);
  expect(titles).toEqual(["AGAPAI", "INGAT Remit", "PACE", "CREOMS"]);
});

test("each card shows year, summary and stack tags", () => {
  render(<WorksPage />);
  const expected: Record<string, string[]> = {
    CREOMS: ["web", "client"],
    AGAPAI: ["mobile", "offline-first"],
    "INGAT Remit": ["stellar", "fintech"],
    PACE: ["ai", "research"],
  };
  for (const [title, tags] of Object.entries(expected)) {
    const c = card(title);
    expect(c.getByText("2026")).toBeDefined();
    for (const tag of tags) expect(c.getByText(tag)).toBeDefined();
  }
});

test("CREOMS shows no status and no links", () => {
  render(<WorksPage />);
  const c = card("CREOMS");
  expect(c.queryByText(/Launching/)).toBeNull();
  expect(c.queryAllByRole("link")).toHaveLength(0);
});

test("AGAPAI and INGAT Remit link Live only", () => {
  render(<WorksPage />);
  for (const title of ["AGAPAI", "INGAT Remit"]) {
    const links = card(title).getAllByRole("link");
    expect(links.map((l) => l.textContent)).toEqual(["Live"]);
  }
});

test("PACE links Live and Code", () => {
  render(<WorksPage />);
  const links = card("PACE").getAllByRole("link");
  expect(links.map((l) => l.textContent)).toEqual(["Live", "Code"]);
});

test("never names the client", () => {
  const { container } = render(<WorksPage />);
  expect(container.textContent).not.toMatch(/bren\s*raphael/i);
});

test("has no filter chips", () => {
  render(<WorksPage />);
  expect(screen.queryByRole("button")).toBeNull();
});

test("summaries state the Owner's role and the award", () => {
  render(<WorksPage />);
  expect(card("CREOMS").getByText(/I lead its development/)).toBeDefined();
  expect(
    card("AGAPAI").getByText(
      /Champion and Most Innovative Prototype.*team of five.*AI and lead developer/,
    ),
  ).toBeDefined();
});

test("AGAPAI, INGAT Remit and PACE show an image Cover with credit and no gradient", () => {
  render(<WorksPage />);
  const expected: Record<string, string> = {
    AGAPAI: "RISFI",
    "INGAT Remit": "Rise In and Stellar",
    PACE: "PACE",
  };
  for (const [title, credit] of Object.entries(expected)) {
    const c = card(title);
    expect(c.getByRole("img")).toBeDefined();
    expect(c.getByText(`Photo: ${credit}`)).toBeDefined();
    expect(c.queryByTestId("cover-pattern")).toBeNull();
  }
});

test("CREOMS shows the pattern Cover and no photo or credit", () => {
  render(<WorksPage />);
  for (const title of ["CREOMS"]) {
    const c = card(title);
    expect(c.getByTestId("cover-pattern")).toBeDefined();
    expect(c.queryByRole("img")).toBeNull();
    expect(c.queryByText(/^Photo:/)).toBeNull();
  }
});

test("AGAPAI Cover carries the Award badge, others do not", () => {
  render(<WorksPage />);
  expect(card("AGAPAI").getByText("Winner · PUP Hackathon 2026")).toBeDefined();
  expect(card("PACE").queryByText(/^Winner/)).toBeNull();
});

test("under reduced motion, photo Covers show the unprocessed image with alt text", () => {
  render(<WorksPage />);
  const img = card("AGAPAI").getByRole("img");
  expect(img.tagName).toBe("IMG");
  expect(img.getAttribute("alt")).toMatch(/Champion and Most Innovative/);
});

test("the pattern Cover does not repeat the title", () => {
  render(<WorksPage />);
  const c = card("CREOMS");
  expect(c.getByTestId("cover-pattern").textContent).toBe("");
  expect(c.getAllByText("CREOMS")).toHaveLength(1);
});

test("photo Covers carry the edge shine; the pattern Cover does not", () => {
  render(<WorksPage />);
  for (const title of ["AGAPAI", "INGAT Remit", "PACE"]) {
    expect(card(title).getByTestId("photo-shine").getAttribute("data-tone")).toBe(
      "blue",
    );
  }
  expect(card("CREOMS").queryByTestId("photo-shine")).toBeNull();
});

test("under reduced motion the shine is a static highlight", () => {
  const { container } = render(<WorksPage />);
  const rims = container.querySelectorAll(".shine-rim");
  expect(rims).toHaveLength(3);
  for (const rim of rims) expect(rim.getAttribute("data-static")).toBe("true");
});

test("the shine follows the pointer when motion is allowed", () => {
  mockMatchMedia(false);
  try {
    const { container } = render(<WorksPage />);
    const rim = container.querySelector<HTMLElement>(".shine-rim")!;
    expect(rim.getAttribute("data-static")).toBeNull();
    fireEvent.pointerMove(rim.parentElement!, { clientX: 10, clientY: 0 });
    expect(rim.dataset.follow).toBe("true");
    fireEvent.pointerLeave(rim.parentElement!);
    expect(rim.dataset.follow).toBeUndefined();
  } finally {
    mockMatchMedia(true);
  }
});
