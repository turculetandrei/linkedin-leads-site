import { CHECKOUT_URL, hero, leads } from "@/content";
import { LeadTable } from "./LeadTable";
import { Window } from "./Window";

export function Hero() {
  const last = hero.headline.length - 1;
  return (
    <section aria-labelledby="hero-title" className="relative pt-20 sm:pt-28 lg:pt-36">
      <div className="container-site">
        <h1
          id="hero-title"
          className="text-[clamp(3.25rem,10.5vw,9.25rem)] font-semibold leading-[0.88] tracking-[-0.055em]"
        >
          {hero.headline.map((line, i) => (
            <span key={line} className="block">
              {i === last ? (
                <>
                  {line.replace(/\.$/, "")}
                  <span className="text-accent">.</span>
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[34rem] text-lg leading-relaxed text-muted text-pretty sm:text-xl">{hero.subline}</p>
          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
            <a href={CHECKOUT_URL} className="btn-accent">
              {hero.cta}
              <span aria-hidden="true">→</span>
            </a>
            <p className="text-sm text-faint">{hero.note}</p>
          </div>
        </div>

        <div className="relative mt-16 sm:mt-20 animate-rise">
          <Window title="output/leads-master.csv" label="Example lead list, best first">
            <LeadTable rows={leads.slice(0, 5)} caption="Example leads, sorted by score" variant="hero" />
          </Window>
          {/* Fade the table into the page so it reads as the top of a longer list */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 rounded-b-xl bg-gradient-to-b from-transparent to-bg"
          />
        </div>
      </div>
    </section>
  );
}
