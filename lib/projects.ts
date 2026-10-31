export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "example-project",
    title: "Example Project",
    summary: "Replace this with a real project.",
    tags: ["Next.js", "TypeScript"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
