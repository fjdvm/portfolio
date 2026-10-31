export type Project = {
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
    year: 2026,
    summary:
      "Customer relationship and e-commerce ordering management system for a client. I lead its development.",
    tags: ["next.js", "typescript", "neon"],
    status: "Launching Nov 2026",
  },
  {
    title: "AGAPAI",
    year: 2026,
    summary:
      "Offline-first injury first-aid app with a health-office dashboard. Champion and Most Innovative Prototype at PUP Hackathon 2026, built by a team of five with me as AI and lead developer.",
    tags: ["react native", "next.js", "convex", "maplibre"],
    liveUrl: "https://agapai-web.vercel.app",
  },
  {
    title: "INGAT Remit",
    year: 2026,
    summary:
      "Split-remittance app for OFWs on Stellar, built for the Stellar APAC Hackathon 2026.",
    tags: ["next.js", "stellar", "soroban"],
    liveUrl: "https://ingat-ten.vercel.app",
  },
  {
    title: "PACE",
    year: 2026,
    summary:
      "Pair-programming AI Coding Environment, a hint-only AI tutor research prototype from PUP students.",
    tags: ["next.js", "typescript", "supabase"],
    liveUrl: "https://pace-rnd.vercel.app",
    codeUrl: "https://github.com/fjdvm/pace",
  },
];
