"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function Header({ showWritings = false }: { showWritings?: boolean }) {
  const pathname = usePathname();
  const nav = showWritings
    ? [...site.nav, { href: "/writings", label: "Writings" }]
    : site.nav;

  return (
    <header>
      <nav aria-label="Main" className="mx-auto max-w-3xl px-6 pt-12">
        <div className="flex items-center justify-end">
          <ul className="flex gap-7 text-[15px] leading-[normal]">
            {nav.map((item) => {
              const active = item.href === pathname;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "flex flex-col gap-[3px] font-medium text-ink after:h-[1.5px] after:bg-nav-active"
                        : "text-muted"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
