import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-3xl px-6 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-6 text-[13px] leading-[normal]">
          <p className="text-faint">© 2026 Fitz.</p>
          <ul className="flex gap-5 text-muted">
            {site.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
