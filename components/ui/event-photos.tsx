"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import BounceCards from "./bounce-cards";
import { playPop } from "@/lib/pop-sound";

// Figma "Event photos · BounceCards": 720×250 frame, 170px cards (6px white
// frame), tilted about -9° / 0° / 9°. Each transform is the card's centre
// offset from the frame centre, read off the Figma frame.
const cards = [
  {
    transform: "rotate(-9deg) translate(-112.75px, -2.34px)",
    src: "/images/works/AGAPAI_Most_Innovative.jpg",
    alt: "Team AI Did It with the Most Innovative Prototype plaque at PUP Hackathon 2026. Photo: RISFI",
  },
  {
    transform: "rotate(0deg) translate(0px, -10px)",
    src: "/images/works/AGAPAI_Champion.jpg",
    alt: "Team AI Did It holding the Champion and Most Innovative Prototype plaques. Photo: RISFI",
    position: "center 5%",
  },
  {
    transform: "rotate(9deg) translate(120.66px, -3.75px)",
    src: "/images/works/INGAT_Stellar.jpg",
    alt: "Participants at the Stellar APAC Hackathon 2026 in Manila. Photo: Rise In and Stellar",
  },
];

export default function EventPhotos() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // The bounce plays once, when the cluster scrolls into view; with reduced
  // motion the cards are simply there.
  return (
    <div className="relative h-[200px] overflow-x-clip sm:h-[250px]">
      <div
        ref={ref}
        className="absolute left-1/2 top-0 h-[250px] w-[720px] origin-top -translate-x-1/2 scale-[0.8] sm:scale-100"
      >
        {(reduce || inView) && (
          <BounceCards
            images={cards}
            containerWidth={720}
            containerHeight={250}
            cardSize={170}
            borderWidth={6}
            radius={16}
            animationDelay={0.1}
            onReveal={playPop}
            transformStyles={cards.map((c) => c.transform)}
            style={
              {
                "--bounce-cards-shadow": "0 10px 24px -6px rgba(0,0,0,0.12)",
              } as React.CSSProperties
            }
          />
        )}
      </div>
    </div>
  );
}
