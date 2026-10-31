import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/15">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6 text-sm text-zinc-600 dark:text-zinc-400">
        <p>© 2026 Fitz.</p>
        <ul className="flex gap-4">
          {site.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
