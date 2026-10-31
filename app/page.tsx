import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Hi, I&apos;m Fitz.</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        A short intro goes here.
      </p>
      <Link href="/projects" className="mt-6 inline-block underline">
        See my work
      </Link>
    </section>
  );
}
