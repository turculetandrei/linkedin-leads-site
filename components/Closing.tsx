import { CHECKOUT_URL, finalCta, footer, nav, PRODUCT_NAME } from "@/content";
import { Logo } from "./Header";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line py-32 sm:py-48">
      <Reveal className="container-site flex flex-col items-start gap-10">
        <h2
          id="cta-title"
          className="max-w-5xl text-[clamp(2.75rem,7.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-balance"
        >
          {finalCta.title}
        </h2>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a href={CHECKOUT_URL} className="btn-accent">
            {finalCta.cta}
            <span aria-hidden="true">→</span>
          </a>
          <p className="text-sm text-faint">{finalCta.note}</p>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-6 py-10 text-sm text-faint md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5 text-fg">
          <Logo />
          <span className="font-semibold tracking-[-0.02em]">{PRODUCT_NAME}</span>
        </div>
        <p>{footer.line}</p>
        <nav aria-label="Footer" className="flex gap-5">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-fg">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
