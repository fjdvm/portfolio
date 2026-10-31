export type Cover =
  | {
      kind: "photo";
      src: string;
      alt: string;
      credit: string;
      position?: string;
    }
  | { kind: "pattern" };

export const categories = ["Web", "Mobile", "Hackathon", "Research"] as const;
export type Category = (typeof categories)[number];

export type Work = {
  cover: Cover;
  title: string;
  year: number;
  summary: string;
  categories: Category[];
  tags: string[];
  badge?: string;
  liveUrl?: string;
  codeUrl?: string;
};

export const works: Work[] = [
  {
    title: "AGAPAI",
    cover: {
      kind: "photo",
      src: "/images/works/AGAPAI_Champion.jpg",
      alt: "Team AI Did It holding the Champion and Most Innovative Prototype plaques",
      credit: "RISFI",
      position: "center 5%",
    },
    year: 2026,
    badge: "Winner · PUP Hackathon 2026",
    summary:
      "Offline-first injury first-aid app with a health-office dashboard. Champion and Most Innovative Prototype at PUP Hackathon 2026, built by a team of five with me as AI and lead developer.",
    categories: ["Mobile", "Hackathon"],
    tags: ["mobile", "offline-first"],
    liveUrl: "https://agapai-web.vercel.app",
  },
  {
    title: "INGAT Remit",
    cover: {
      kind: "photo",
      src: "/images/works/INGAT_Stellar.jpg",
      alt: "Participants at the Stellar APAC Hackathon 2026 in Manila",
      credit: "Rise In and Stellar",
    },
    year: 2026,
    summary:
      "Split-remittance app for OFWs on Stellar, built for the Stellar APAC Hackathon 2026.",
    categories: ["Web", "Hackathon"],
    tags: ["stellar", "fintech"],
    liveUrl: "https://ingat-ten.vercel.app",
  },
  {
    title: "PACE",
    cover: {
      kind: "photo",
      src: "/images/works/PACE_work.png",
      alt: "The PACE landing page: Hints, not answers",
      credit: "PACE",
      position: "top",
    },
    year: 2026,
    summary:
      "A coding workspace with an AI tutor that guides you instead of solving it for you. Undergraduate research.",
    categories: ["Web", "Research"],
    tags: ["ai", "research"],
    liveUrl: "https://pace-rnd.vercel.app",
    codeUrl: "https://github.com/fjdvm/pace",
  },
  {
    title: "CREOMS",
    cover: { kind: "pattern" },
    year: 2026,
    summary:
      "Customer relationship and e-commerce ordering management system for a client. I lead its development.",
    categories: ["Web"],
    tags: ["web", "client"],
  },
];

export const selectedWorks = ["CREOMS", "AGAPAI", "INGAT Remit"].map(
  (title) => works.find((p) => p.title === title)!,
);

export type CommunityEvent = {
  title: string;
  date: string;
  detail: string;
};

export const events: CommunityEvent[] = [
  {
    title: "PUP Hackathon 2026",
    date: "Oct 2026",
    detail: "Champion and Most Innovative Prototype · AGAPAI",
  },
  {
    title: "Stellar APAC Hackathon",
    date: "Jul 2026",
    detail: "INGAT Remit",
  },
];
