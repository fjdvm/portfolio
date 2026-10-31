import Image from "next/image";
import ShinyText from "./shiny-text";
import StarBorder from "./star-border";

// Wins and awards only, never a generic tag.
export function AwardBadge({
  label,
}: {
  label: string;
}) {
  return (
    <StarBorder
      as="span"
      theme="light"
      color="#0a0a0a"
      duration={6}
      radius={99}
      thickness={1}
      glow={0}
      hover="none"
      clickPulse={false}
      backgroundColor="#ffffff"
      borderColor="#c7c7cc"
      textColor="#1d1d1f"
      // Padding is 1px more than Figma's: its 1px border takes layout space, StarBorder's is inset.
      // `!` beats StarBorder's built-in px-6 py-3.5.
      className="gap-[5px] !py-[5px] !pl-[10px] !pr-[12px] max-w-full text-xs leading-4"
    >
      <Image src="/icons/trophy.svg" alt="" width={12} height={12} />
      <ShinyText
        color="#1d1d1f"
        shineColor="#999999"
        speed={3}
        delay={0}
        className="min-w-0"
      >
        {label}
      </ShinyText>
    </StarBorder>
  );
}
