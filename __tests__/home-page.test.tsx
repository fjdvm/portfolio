import { afterEach, expect, test, vi } from "vitest";
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import Home from "@/app/page";
import { site } from "@/lib/site";

// jsdom has no WebGL; PatternWaves renders its canvas through ogl.
vi.mock("@/components/ui/pattern-waves", () => ({ default: () => null }));

afterEach(cleanup);

test("shows the heading", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hi, I'm Fitz." }),
  ).toBeDefined();
});

test("intro is one paragraph that ends by linking LinkedIn, GitHub and email, with no résumé link", () => {
  render(<Home />);
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

test("info card rows match the Highlight, Now and Studying copy", () => {
  render(<Home />);
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

test("intro states the Owner's work and interests, with no draft note", () => {
  render(<Home />);
  expect(
    screen.getByText(
      /^I'm a PUP student who builds web and mobile apps and small tools\. I lead development of a client system, and I'm growing more interested in AI, cloud, and backend engineering\./,
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
      .getByRole("link", { name: /All projects/ })
      .getAttribute("href"),
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

test("hero photo with caption shows only when enabled", () => {
  render(<Home />);
  const caption = screen.queryByText("PUP Hackathon 2026 · Team AI Did It");
  if (!site.showHeroPhoto) {
    expect(caption).toBeNull();
    return;
  }
  expect(caption).toBeDefined();
  expect(screen.getAllByText("Photo: RISFI").length).toBe(2);
});

test("photo project rows show their credit; CREOMS has none", () => {
  render(<Home />);
  const section = screen.getByRole("region", { name: "Selected projects" });
  const rows = within(section).getAllByRole("listitem");
  expect(within(rows[0]).queryByText(/Photo:/)).toBeNull();
  expect(within(rows[1]).getByText("Photo: RISFI")).toBeDefined();
  expect(within(rows[2]).getByText("Photo: Rise In and Stellar")).toBeDefined();
});

function eventPhotos() {
  render(<Home />);
  const section = screen.getByRole("region", { name: "Events & community" });
  return { section, photos: within(section).getAllByRole("img") };
}

test("events show the three photos in order, before the rows", () => {
  const { section, photos } = eventPhotos();
  expect(photos.map((p) => p.getAttribute("src"))).toEqual([
    "/images/projects/AGAPAI_Most_Innovative.jpg",
    "/images/projects/AGAPAI_Champion.jpg",
    "/images/projects/INGAT_Stellar.jpg",
  ]);
  const firstRow = within(section).getAllByRole("listitem")[0];
  expect(
    photos[2].compareDocumentPosition(firstRow) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});

test("event photos carry their credit in the alt text", () => {
  const { photos } = eventPhotos();
  expect(photos.map((p) => p.getAttribute("alt")?.split("Photo: ")[1])).toEqual(
    ["RISFI", "RISFI", "Rise In and Stellar"],
  );
});

test("with reduced motion the event photos are in place without a bounce", async () => {
  const { photos } = eventPhotos();
  await waitFor(() =>
    expect((photos[0].parentElement as HTMLElement).style.transform).toMatch(
      /scale\(1\.0000\)/,
    ),
  );
});
