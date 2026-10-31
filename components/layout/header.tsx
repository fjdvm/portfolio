"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-black/10 dark:border-white/15">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-3xl justify-end px-6 py-4"
      >
        <ul className="flex gap-4 text-sm">
          {site.nav.map((item) => {
            const active = item.href === pathname;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={active ? "font-semibold underline" : undefined}
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
