export const site = {
  name: "Fitz Martin",
  url: "https://fitzmartin.pages.dev",
  description: "Student builder at PUP.",
  // Hero photo on Home is built but hidden for now; flip to show it again.
  showHeroPhoto: false,
  nav: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
  ],
  links: [
    { label: "GitHub", href: "https://github.com/fjdvm" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/fitzmartin" },
    { label: "Email", href: "mailto:jude.nitram08@gmail.com" },
  ],
} as const;
