import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NichePage } from "@/components/NichePage";
import { niches } from "@/content";

// Static export: one HTML page per niche in content.ts, nothing else
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(niches).map((niche) => ({ niche }));
}

type Props = { params: Promise<{ niche: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche } = await params;
  const content = niches[niche];
  if (!content) return {};
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: `/${niche}` },
    openGraph: { title: content.meta.title, description: content.meta.description, type: "website" },
  };
}

export default async function NicheRoute({ params }: Props) {
  const { niche } = await params;
  const content = niches[niche];
  if (!content) notFound();
  return <NichePage niche={content} />;
}
