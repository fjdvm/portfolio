"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header>
      <nav aria-label="Main" className="mx-auto max-w-3xl px-6 pt-12">
        <ul className="flex justify-end gap-7 text-[15px] leading-[normal]">
          {site.nav.map((item) => {
            const active = item.href === pathname;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "flex flex-col gap-[3px] font-medium text-ink after:h-[1.5px] after:bg-accent"
                      : "text-muted"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
