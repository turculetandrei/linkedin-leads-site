import type { Niche } from "@/content";

export function Faq({ niche }: { niche: Niche }) {
  const { faq } = niche;
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-title" className="section-title mt-4">
            {faq.title}
          </h2>
        </div>

        {/* Native <details>: keyboard and screen-reader support with no JavaScript */}
        <div className="border-t border-line">
          {faq.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-[-0.01em] sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="relative size-3.5 shrink-0 text-faint transition-transform duration-300 group-open:rotate-45"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-muted text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
