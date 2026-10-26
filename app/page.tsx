import type { Metadata } from "next";
import { NichePage } from "@/components/NichePage";
import { DEFAULT_NICHE, niches } from "@/content";

const niche = niches[DEFAULT_NICHE];

// / shows the default niche for now; the niche page is the canonical address
export const metadata: Metadata = {
  title: niche.meta.title,
  description: niche.meta.description,
  alternates: { canonical: `/${DEFAULT_NICHE}` },
  openGraph: { title: niche.meta.title, description: niche.meta.description, type: "website" },
};

export default function Home() {
  return <NichePage niche={niche} />;
}
