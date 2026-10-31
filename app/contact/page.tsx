import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Email and social links go here.
      </p>
    </section>
  );
}
