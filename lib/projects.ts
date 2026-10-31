export type Cover =
  | { kind: "photo"; src: string; alt: string; credit: string; position?: string }
  | { kind: "pattern"; color: string };

export type Project = {
  cover: Cover;
  title: string;
  year: number;
  summary: string;
  tags: string[];
  status?: string;
  liveUrl?: string;
  codeUrl?: string;
};

export const projects: Project[] = [
  {
    title: "CREOMS",
    cover: { kind: "pattern", color: "#0f766e" },
    year: 2026,
    summary:
      "Customer relationship and e-commerce ordering management system for a client. I lead its development.",
    tags: ["next.js", "typescript", "neon"],
    status: "Launching Nov 2026",
  },
  {
    title: "AGAPAI",
    cover: {
      kind: "photo",
      src: "/images/projects/AGAPAI_Champion.jpg",
      alt: "Team AI Did It holding the Champion and Most Innovative Prototype plaques",
      credit: "RISFI",
      position: "center 30%",
    },
    year: 2026,
    summary:
      "Offline-first injury first-aid app with a health-office dashboard. Champion and Most Innovative Prototype at PUP Hackathon 2026, built by a team of five with me as AI and lead developer.",
    tags: ["react native", "next.js", "convex", "maplibre"],
    liveUrl: "https://agapai-web.vercel.app",
  },
  {
    title: "INGAT Remit",
    cover: {
      kind: "photo",
      src: "/images/projects/INGAT_Stellar.jpg",
      alt: "Participants at the Stellar APAC Hackathon 2026 in Manila",
      credit: "Rise In and Stellar",
    },
    year: 2026,
    summary:
      "Split-remittance app for OFWs on Stellar, built for the Stellar APAC Hackathon 2026.",
    tags: ["next.js", "stellar", "soroban"],
    liveUrl: "https://ingat-ten.vercel.app",
  },
  {
    title: "PACE",
    cover: {
      kind: "photo",
      src: "/images/projects/PACE_project.png",
      alt: "The PACE landing page: Hints, not answers",
      credit: "PACE",
      position: "top",
    },
    year: 2026,
    summary:
      "Pair-programming AI Coding Environment, a hint-only AI tutor research prototype from PUP students.",
    tags: ["next.js", "typescript", "supabase"],
    liveUrl: "https://pace-rnd.vercel.app",
    codeUrl: "https://github.com/fjdvm/pace",
  },
];
