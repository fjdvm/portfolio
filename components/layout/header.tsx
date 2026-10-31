"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header>
      <nav aria-label="Main" className="mx-auto max-w-3xl px-6 pt-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Fitz, home"
            className="flex items-center gap-[6.48px]"
          >
            <Image
              src="/images/logo/mark.svg"
              alt=""
              width={26}
              height={26}
              priority
            />
            <Image
              src="/images/logo/wordmark.svg"
              alt=""
              width={33}
              height={16}
              priority
            />
          </Link>
          <ul className="flex gap-7 text-[15px] leading-[normal]">
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
        </div>
      </nav>
    </header>
  );
}
