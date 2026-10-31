import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/lib/site";
import { getWritings } from "@/lib/writings-source";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const hasWritings = (await getWritings()).length > 0;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header showWritings={hasWritings} />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-24">
          {children}
        </main>
        <Footer showRss={hasWritings} />
      </body>
    </html>
  );
}
