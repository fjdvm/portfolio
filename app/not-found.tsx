import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <Link href="/" className="mt-4 inline-block underline">
        Back home
      </Link>
    </section>
  );
}
