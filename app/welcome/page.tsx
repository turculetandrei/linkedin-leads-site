import type { Metadata } from "next";
import { Footer } from "@/components/Closing";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/NichePage";
import { BOOKING_URL, SUPPORT_EMAIL, welcome } from "@/content";

// Post-payment page: not for search engines
export const metadata: Metadata = {
  title: welcome.meta.title,
  robots: { index: false, follow: false },
};

export default function Welcome() {
  return (
    <>
      <SkipLink />
      <Header links={false} />
      <main id="main" className="container-site py-20 sm:py-28">
        <p className="eyebrow">{welcome.eyebrow}</p>
        <h1 className="mt-6 text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
          {welcome.title}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">{welcome.body}</p>
        <a href={BOOKING_URL} className="btn-accent mt-10">
          {welcome.cta}
          <span aria-hidden="true">→</span>
        </a>

        <ol className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {welcome.steps.map((step, i) => (
            <li key={step.title} className="bg-surface p-6 sm:p-7">
              <span aria-hidden="true" className={`font-mono text-xs ${i === 0 ? "text-accent" : "text-faint"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em]">{step.title}</h2>
              <p className="mt-1.5 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-faint">
          {welcome.help}{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-fg underline underline-offset-4">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </main>
      <Footer links={false} />
    </>
  );
}
