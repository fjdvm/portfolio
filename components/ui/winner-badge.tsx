import Image from "next/image";

export function WinnerBadge({
  label,
  icon = true,
  className = "",
}: {
  label: string;
  icon?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-full bg-paper py-[3px] pl-[7px] pr-[9px] text-xs font-medium leading-[normal] text-ink ${className}`}
    >
      {icon && <Image src="/icons/trophy.svg" alt="" width={12} height={12} />}
      {label}
    </span>
  );
}
