import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/15">
      <div className="mx-auto max-w-3xl px-6 py-6 text-sm text-zinc-600 dark:text-zinc-400">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
