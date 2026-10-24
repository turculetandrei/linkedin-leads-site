import { FinalCta, Footer } from "@/components/Closing";
import { Demo } from "@/components/Demo";
import { Facts } from "@/components/Facts";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Demo />
        <Facts />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
