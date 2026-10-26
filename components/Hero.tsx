import { CTA_LABEL, SIGNUP_URL, type Niche } from "@/content";
import { Avatar } from "./Avatar";

/** The morning digest: what a client actually receives. */
function DigestCard({ niche }: { niche: Niche }) {
  const top = niche.proof.leads.slice(0, 3);
  return (
    <figure
      aria-label="Example of the daily hot-lead digest"
      className="card animate-rise overflow-hidden shadow-[0_1px_2px_rgba(14,14,12,0.04),0_30px_70px_-30px_rgba(14,14,12,0.25)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          <span className="font-medium">{niche.hero.digestTitle}</span>
        </div>
        <span className="font-mono text-xs text-faint">{niche.hero.digestMeta}</span>
      </div>
      <ul>
        {top.map((lead) => (
          <li key={lead.name} className="flex gap-3.5 border-b border-line px-5 py-4 last:border-b-0">
            <Avatar name={lead.name} className="size-9 text-xs" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate font-medium">{lead.name}</p>
                <p className="shrink-0 font-mono text-sm font-medium text-accent">
                  <span className="sr-only">Score </span>
                  {lead.score}/10
                </p>
              </div>
              <p className="truncate text-sm text-muted">
                {lead.role}, {lead.company}
              </p>
              <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-faint">{lead.reason}</p>
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function Hero({ niche }: { niche: Niche }) {
  const { hero } = niche;
  return (
    <section aria-labelledby="hero-title" className="pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-28">
      <div className="container-site">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-6 text-[clamp(3rem,8.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
        >
          {hero.headline.map((line) => (
            // Inline on phones so the words wrap naturally; one line each from sm
            <span key={line} className="sm:block">
              {line}{" "}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-[1fr_27rem] lg:items-start lg:gap-16">
          <div>
            <p className="max-w-[36rem] text-lg leading-relaxed text-muted text-pretty sm:text-xl">{hero.subline}</p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <a href={SIGNUP_URL} className="btn-accent">
                {CTA_LABEL}
                <span aria-hidden="true">→</span>
              </a>
              <p className="text-sm text-faint">{hero.note}</p>
            </div>
          </div>
          <DigestCard niche={niche} />
        </div>
      </div>
    </section>
  );
}
