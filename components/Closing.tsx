import { CTA_LABEL, footer, LOGIN_URL, nav, PRODUCT_NAME, SIGNUP_URL, type Niche } from "@/content";
import { Logo } from "./Header";
import { Reveal } from "./Reveal";

export function FinalCta({ niche }: { niche: Niche }) {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line py-28 sm:py-40">
      <Reveal className="container-site flex flex-col items-start gap-10">
        <h2
          id="cta-title"
          className="max-w-5xl text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-balance"
        >
          {niche.finalCta.title}
        </h2>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a href={SIGNUP_URL} className="btn-accent">
            {CTA_LABEL}
            <span aria-hidden="true">→</span>
          </a>
          <p className="text-sm text-faint">{niche.finalCta.note}</p>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer({ links = true }: { links?: boolean }) {
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-6 py-10 text-sm text-faint md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5 text-fg">
          <Logo />
          <span className="font-semibold tracking-[-0.02em]">{PRODUCT_NAME}</span>
        </div>
        <p>
          © {new Date().getFullYear()} {PRODUCT_NAME}. {footer.line}
        </p>
        <nav aria-label="Footer" className="flex gap-5">
          {links &&
            nav.links.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-fg">
                {link.label}
              </a>
            ))}
          <a href={LOGIN_URL} className="transition-colors hover:text-fg">
            {nav.login}
          </a>
        </nav>
      </div>
    </footer>
  );
}
