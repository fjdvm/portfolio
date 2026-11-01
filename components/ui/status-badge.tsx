import { Construction } from "lucide-react";

// Plain and static. Shown on the Works page card of every Work without a photo; never set by hand.
export function StatusBadge() {
  return (
    <span
      className="inline-flex items-center gap-[5px] rounded-full border border-[#c7c7cc] bg-white px-[10px] py-[5px] text-xs leading-4 text-[#1d1d1f]"
    >
      <Construction aria-hidden="true" className="size-3" />
      Under development
    </span>
  );
}
