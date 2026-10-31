import { afterEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import NotFound from "@/app/not-found";
import { metadata } from "@/app/layout";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "" }),
  Geist_Mono: () => ({ variable: "" }),
  Newsreader: () => ({ variable: "" }),
}));

afterEach(() => {
  cleanup();
  pathname.value = "/";
});

test("nav shows only Home and Projects", () => {
  render(<Header />);
  const links = within(screen.getByRole("navigation")).getAllByRole("link");
  expect(links.map((l) => l.textContent)).toEqual(["Home", "Projects"]);
});

test("header has no logo", () => {
  render(<Header />);
  expect(screen.queryByRole("link", { name: "Fitz, home" })).toBeNull();
  expect(document.querySelector("header img")).toBeNull();
});

test("nav marks the current page", () => {
  pathname.value = "/projects";
  render(<Header />);
  expect(
    screen.getByRole("link", { name: "Projects" }).getAttribute("aria-current"),
  ).toBe("page");
  expect(
    screen.getByRole("link", { name: "Home" }).getAttribute("aria-current"),
  ).toBeNull();
});

test("footer shows copyright and the three links only", () => {
  render(<Footer />);
  expect(screen.getByText("© 2026 Fitz.")).toBeDefined();
  const links = screen.getAllByRole("link");
  expect(links.map((l) => [l.textContent, l.getAttribute("href")])).toEqual([
    ["GitHub", "https://github.com/fjdvm"],
    ["LinkedIn", "https://www.linkedin.com/in/fitzmartin"],
    ["Email", "mailto:jude.nitram08@gmail.com"],
  ]);
});

test("metadata has the title and description", () => {
  expect(metadata.title).toMatchObject({ default: "Fitz Martin" });
  expect(metadata.description).toBe("Student builder at PUP.");
});

test("not-found page renders", () => {
  render(<NotFound />);
  expect(screen.getByRole("heading", { name: "Page not found" })).toBeDefined();
});
