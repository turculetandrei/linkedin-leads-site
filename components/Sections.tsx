import { type Niche } from "@/content";
import { LeadTable } from "./LeadTable";
import { Reveal } from "./Reveal";
import { Window } from "./Window";

function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title mt-4">
        {title}
      </h2>
      {children && <div className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">{children}</div>}
    </div>
  );
}

/** 2. The outcome: one statement, three short points. */
export function Outcome({ niche }: { niche: Niche }) {
  const { outcome } = niche;
  return (
    <section aria-labelledby="outcome-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">{outcome.eyebrow}</p>
          <h2
            id="outcome-title"
            className="mt-4 max-w-5xl text-[clamp(2.25rem,5.5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance"
          >
            {outcome.title}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted text-pretty">{outcome.body}</p>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {outcome.points.map((point, i) => (
            <Reveal as="li" key={point} delay={i * 0.08} className="flex items-center gap-3 bg-surface px-6 py-5">
              <span aria-hidden="true" className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-medium">{point}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 3. Proof: the product screenshot and the real engagement averages. */
export function Proof({ niche }: { niche: Niche }) {
  const { proof } = niche;
  return (
    <section id="proof" aria-labelledby="proof-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-site">
        <SectionHead id="proof-title" eyebrow={proof.eyebrow} title={proof.title}>
          {proof.body}
        </SectionHead>

        <Reveal className="mt-14">
          <Window
            title={proof.windowTitle}
            label="Product screenshot: scored leads with the AI's reason"
            aside={
              <div className="hidden gap-1 sm:flex" aria-hidden="true">
                {proof.tabs.map((tab, i) => (
                  <span
                    key={tab}
                    className={`rounded-full px-3 py-1 text-xs ${i === 0 ? "bg-fg text-bg" : "text-faint"}`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            }
          >
            <LeadTable rows={proof.leads} caption="Sample leads, best first" />
          </Window>
          <p className="mt-4 text-sm text-faint">{proof.footnote}</p>
        </Reveal>

        <div className="mt-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {proof.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06} className="flex flex-col-reverse gap-2 bg-surface p-6 sm:p-7">
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="text-4xl font-semibold tracking-[-0.04em] tabular-nums sm:text-5xl">{stat.value}</dd>
              </Reveal>
            ))}
          </dl>
          <p className="mt-4 text-sm text-faint">{proof.statsNote}</p>
        </div>
      </div>
    </section>
  );
}

/** 5. Effort: everything included, what you don't need. */
export function Effort({ niche }: { niche: Niche }) {
  const { effort } = niche;
  return (
    <section aria-labelledby="effort-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">{effort.eyebrow}</p>
          <h2 id="effort-title" className="section-title mt-4">
            {effort.title}
          </h2>
          <ul className="mt-8 space-y-3" aria-label="What you don't need">
            {effort.nots.map((item) => (
              <li key={item} className="flex items-center gap-3 text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-accent-soft text-accent">
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M3 3l6 6M9 3l-6 6" />
                  </svg>
                </span>
                {item}.
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg leading-relaxed text-muted">{effort.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="card self-start p-6 sm:p-8">
          <p className="text-sm font-medium">Included in one yearly price</p>
          <ul className="mt-5 divide-y divide-line">
            {effort.included.map((item) => (
              <li key={item} className="flex items-center justify-between gap-4 py-3.5">
                <span>{item}</span>
                <span className="font-mono text-xs text-faint">included</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** 6. Sources: own page, competitors, influencers. */
export function Sources({ niche }: { niche: Niche }) {
  const { sources } = niche;
  return (
    <section id="sources" aria-labelledby="sources-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-site">
        <SectionHead id="sources-title" eyebrow={sources.eyebrow} title={sources.title} />
        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {sources.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08} className="card flex flex-col p-6 sm:p-7">
              <span aria-hidden="true" className="font-mono text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted text-pretty">{item.body}</p>
              <p className="mt-6 truncate rounded-lg bg-sunken px-3 py-2 font-mono text-xs text-muted">{item.example}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 text-muted">{sources.note}</p>
      </div>
    </section>
  );
}
