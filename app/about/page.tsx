import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Background, skills, and experience go here.
      </p>
    </section>
  );
}
