import type { Niche } from "@/content";
import { FinalCta, Footer } from "./Closing";
import { Faq } from "./Faq";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Bonuses, Guarantee, Pricing } from "./Offer";
import { Effort, Outcome, Proof, Sources } from "./Sections";
import { Speed } from "./Speed";

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
    >
      Skip to content
    </a>
  );
}

/** One landing page per niche, all sections in the order of the brief. */
export function NichePage({ niche }: { niche: Niche }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero niche={niche} />
        <Outcome niche={niche} />
        <Proof niche={niche} />
        <Speed niche={niche} />
        <Effort niche={niche} />
        <Sources niche={niche} />
        <Bonuses />
        <Guarantee />
        <Pricing />
        <Faq niche={niche} />
        <FinalCta niche={niche} />
      </main>
      <Footer />
    </>
  );
}
