import { afterEach, beforeEach, expect, test, vi } from "vitest";
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import Home from "@/app/page";
import { site } from "@/lib/site";
import { getWritings } from "@/lib/writings-source";
import { fixtureWritings } from "./fixtures/writings";

// jsdom has no WebGL; HalftoneReveal draws its canvas with WebGL.
vi.mock("@/components/ui/halftone-reveal", () => ({ default: () => null }));

vi.mock("@/lib/writings-source", () => ({ getWritings: vi.fn() }));

beforeEach(() => vi.mocked(getWritings).mockResolvedValue([]));
afterEach(cleanup);

test("shows the heading", async () => {
  render(await Home());
  expect(
    screen.getByRole("heading", { level: 1, name: "Hi, I'm Fitz." }),
  ).toBeDefined();
});

test("intro is one paragraph that ends by linking LinkedIn, GitHub and email, with no résumé link", async () => {
  render(await Home());
  const intro = screen.getByText(/I'm a PUP student/);
  expect(intro.tagName).toBe("P");
  expect(intro.textContent).toMatch(
    /backend engineering\. You can also find me on LinkedIn, GitHub, or send me an email\.$/,
  );
  const links = within(intro).getAllByRole("link");
  expect(links.map((l) => [l.textContent, l.getAttribute("href")])).toEqual([
    ["LinkedIn", "https://www.linkedin.com/in/fitzmartin"],
    ["GitHub", "https://github.com/fjdvm"],
    ["send me an email", "mailto:jude.nitram08@gmail.com"],
  ]);
  expect(screen.queryByText(/résumé|resume|cv/i)).toBeNull();
});

test("info card rows match the Highlight, Now and Studying copy", async () => {
  render(await Home());
  const card = screen.getByRole("group", { name: "At a glance" });
  const rows = Array.from(card.querySelectorAll("dt")).map((dt) => [
    dt.textContent,
    dt.nextElementSibling?.textContent,
  ]);
  expect(rows).toEqual([
    [
      "Highlight",
      "Champion & Most Innovative PrototypePUP Hackathon 2026, with AGAPAI",
    ],
    ["Now", "Leading CREOMS development"],
    ["Studying", "Polytechnic University of the Philippines, expected 2027"],
  ]);
});

test("intro states the Owner's work and interests, with no draft note", async () => {
  render(await Home());
  expect(
    screen.getByText(
      /^I'm a PUP student who builds web and mobile apps and small tools\. I lead development of a client system, and I'm growing more interested in AI, cloud, and backend engineering\./,
    ),
  ).toBeDefined();
  expect(screen.queryByText(/draft/i)).toBeNull();
});

test("selected works list CREOMS, AGAPAI, INGAT Remit in order with Covers and an All works link", async () => {
  render(await Home());
  const section = screen.getByRole("region", { name: "Selected works" });
  const rows = within(section).getAllByRole("listitem");
  expect(rows.map((r) => r.querySelector("h3")?.textContent)).toEqual([
    "CREOMS",
    "AGAPAI",
    "INGAT Remit",
  ]);
  expect(rows.map((r) => r.querySelector("time")?.textContent)).toEqual([
    "2026",
    "2026",
    "2026",
  ]);
  expect(within(rows[0]).getByTestId("cover-pattern")).toBeDefined();
  expect(within(rows[1]).getByRole("img", { name: /Champion/ })).toBeDefined();
  expect(
    within(rows[2]).getByRole("img", { name: /Stellar APAC/ }),
  ).toBeDefined();
  expect(
    within(section)
      .getByRole("link", { name: /All works/ })
      .getAttribute("href"),
  ).toBe("/works");
});

test("events lists exactly PUP Hackathon 2026 and Stellar APAC Hackathon", async () => {
  render(await Home());
  const section = screen.getByRole("region", { name: "Events & community" });
  const rows = within(section).getAllByRole("listitem");
  expect(rows.map((r) => r.textContent)).toEqual([
    "Oct 2026PUP Hackathon 2026Champion and Most Innovative Prototype · AGAPAI",
    "Jul 2026Stellar APAC HackathonINGAT Remit",
  ]);
});

test("has no Writings section or link while there are no Writings", async () => {
  render(await Home());
  expect(screen.queryByText(/writings?/i)).toBeNull();
});

test("with Writings, Recent writings shows the latest essay, three rows and an All writings link", async () => {
  vi.mocked(getWritings).mockResolvedValue(fixtureWritings);
  render(await Home());
  const section = screen.getByRole("region", { name: "Recent writings" });
  expect(
    within(section).getByRole("heading", { name: "Fixture latest essay" }),
  ).toBeDefined();
  expect(within(section).getByText("18 Oct 2026")).toBeDefined();
  expect(within(section).getByText("Latest summary.")).toBeDefined();
  const rows = within(section).getAllByRole("listitem");
  expect(rows.map((r) => r.textContent)).toEqual([
    "Second essay02 Aug 2026",
    "Third essay21 Jun 2026",
    "Fourth essay03 Apr 2026",
  ]);
  expect(
    within(section)
      .getByRole("link", { name: /All writings/ })
      .getAttribute("href"),
  ).toBe("/writings");
});

test("hero photo with caption shows only when enabled", async () => {
  render(await Home());
  const caption = screen.queryByText("PUP Hackathon 2026 · Team AI Did It");
  if (!site.showHeroPhoto) {
    expect(caption).toBeNull();
    return;
  }
  expect(caption).toBeDefined();
  expect(screen.queryByText("Photo: RISFI")).toBeNull();
  // The hero carries the edge shine, not the star border.
  expect(screen.getAllByTestId("photo-shine").length).toBe(3);
});

test("photo thumbnails in selected works carry the edge shine; CREOMS does not", async () => {
  render(await Home());
  const section = screen.getByRole("region", { name: "Selected works" });
  const rows = within(section).getAllByRole("listitem");
  expect(within(rows[0]).queryByTestId("photo-shine")).toBeNull();
  expect(within(rows[1]).getByTestId("photo-shine")).toBeDefined();
  expect(within(rows[2]).getByTestId("photo-shine")).toBeDefined();
});

test("no Status badge on the Home thumbnails", async () => {
  render(await Home());
  expect(screen.queryByText("Under development")).toBeNull();
});

test("photo work rows show their credit; CREOMS has none", async () => {
  render(await Home());
  const section = screen.getByRole("region", { name: "Selected works" });
  const rows = within(section).getAllByRole("listitem");
  expect(within(rows[0]).queryByText(/Photo:/)).toBeNull();
  expect(within(rows[1]).queryByText(/Photo:/)).toBeNull();
  expect(within(rows[2]).getByText("Photo: Rise In and Stellar")).toBeDefined();
});

async function eventPhotos() {
  render(await Home());
  const section = screen.getByRole("region", { name: "Events & community" });
  return { section, photos: within(section).getAllByRole("img") };
}

test("events show the three photos in order, before the rows", async () => {
  const { section, photos } = await eventPhotos();
  expect(photos.map((p) => p.getAttribute("src"))).toEqual([
    "/images/works/AGAPAI_Most_Innovative.jpg",
    "/images/works/AGAPAI_Champion.jpg",
    "/images/works/INGAT_Stellar.jpg",
  ]);
  const firstRow = within(section).getAllByRole("listitem")[0];
  expect(
    photos[2].compareDocumentPosition(firstRow) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});

test("event photos carry a credit in the alt text only when not our own", async () => {
  const { photos } = await eventPhotos();
  expect(photos.map((p) => p.getAttribute("alt")?.split("Photo: ")[1])).toEqual(
    [undefined, undefined, "Rise In and Stellar"],
  );
});

test("with reduced motion the event photos are in place without a bounce", async () => {
  const { photos } = await eventPhotos();
  await waitFor(() =>
    expect((photos[0].parentElement as HTMLElement).style.transform).toMatch(
      /scale\(1\.0000\)/,
    ),
  );
});
