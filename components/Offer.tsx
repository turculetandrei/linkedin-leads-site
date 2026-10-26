import { bonuses, CTA_LABEL, guarantee, money, pricing, SIGNUP_URL, type Plan } from "@/content";
import { Reveal } from "./Reveal";

/** 7. Bonus stack with € values and a total. */
export function Bonuses() {
  const total = bonuses.items.reduce((sum, item) => sum + item.value, 0);
  return (
    <section aria-labelledby="bonuses-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <p className="eyebrow">{bonuses.eyebrow}</p>
          <h2 id="bonuses-title" className="section-title mt-4">
            {bonuses.title}
          </h2>
        </div>
        <Reveal className="card overflow-hidden">
          <ul>
            {bonuses.items.map((item) => (
              <li key={item.name} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5 border-b border-line p-5 sm:p-6">
                <h3 className="font-semibold tracking-[-0.01em]">{item.name}</h3>
                <p className="font-mono text-sm text-faint tabular-nums">
                  <span className="sr-only">Value </span>
                  {money(item.value)}
                </p>
                <p className="col-span-2 leading-relaxed text-muted text-pretty">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-baseline justify-between gap-3 bg-sunken p-5 sm:p-6">
            <p className="font-medium">
              {bonuses.totalLabel}: <span className="tabular-nums">{money(total)}</span>
            </p>
            <p className="text-sm font-medium text-accent-hover">{bonuses.includedLabel}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** 8. The guarantee block. */
export function Guarantee() {
  return (
    <section aria-labelledby="guarantee-title" className="py-6 sm:py-8">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-3xl bg-fg px-6 py-14 text-bg sm:px-12 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
            <div
              aria-hidden="true"
              className="grid size-28 place-items-center rounded-full border border-bg/20 sm:size-36"
            >
              <div className="text-center">
                <p className="text-4xl font-semibold tracking-[-0.04em] text-[#ff7a4d] sm:text-5xl">50</p>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-bg/70">warm leads</p>
              </div>
            </div>
            <div>
              <h2 id="guarantee-title" className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
                {guarantee.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-bg/85 text-pretty">{guarantee.promise}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bg/70 text-pretty">{guarantee.conditions}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const highlight = plan.highlight === true;
  return (
    <div
      className={`card flex flex-col p-6 sm:p-8 ${highlight ? "border-fg shadow-[0_24px_60px_-30px_rgba(14,14,12,0.3)]" : ""}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold tracking-[-0.02em]">{plan.name}</h3>
        {plan.badge && (
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-hover">{plan.badge}</span>
        )}
      </div>

      <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
        {plan.priceWas !== undefined && (
          <s className="text-2xl text-faint tabular-nums decoration-1">
            <span className="sr-only">Was </span>
            {money(plan.priceWas)}
          </s>
        )}
        <span className="text-5xl font-semibold tracking-[-0.045em] tabular-nums sm:text-6xl">
          {plan.priceWas !== undefined && <span className="sr-only">Now </span>}
          {money(plan.price)}
        </span>
        <span className="text-muted">{plan.period}</span>
      </p>

      {plan.spots && (
        <p className="mt-3 text-sm font-medium text-accent">
          {plan.spots.left} of {plan.spots.total} spots left
        </p>
      )}

      <ul className="mt-8 space-y-3 border-t border-line pt-6">
        <li className="flex justify-between gap-4">
          <span className="text-muted">Sources watched</span>
          <span className="font-medium tabular-nums">{plan.sources}</span>
        </li>
        <li className="flex justify-between gap-4">
          <span className="text-muted">People analyzed per month</span>
          <span className="font-medium tabular-nums">{plan.peoplePerMonth.toLocaleString("en-IE")}</span>
        </li>
        {pricing.included.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <svg viewBox="0 0 16 16" className="mt-1 size-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 8.5l3 3 7-7" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href={SIGNUP_URL}
        className={
          highlight
            ? "btn-accent mt-10"
            : "mt-10 inline-flex min-h-12 items-center justify-center rounded-full border border-line-strong px-5 font-semibold transition-colors hover:border-fg"
        }
      >
        {CTA_LABEL}
      </a>
    </div>
  );
}

/** 9. Pricing with limits. */
export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-24 sm:py-32">
      <div className="container-site">
        <p className="eyebrow">{pricing.eyebrow}</p>
        <h2 id="pricing-title" className="section-title mt-4 max-w-3xl">
          {pricing.title}
        </h2>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {pricing.plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="flex">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-lg font-medium tracking-[-0.01em]">{pricing.anchor}</p>
          <p className="text-sm text-faint">{pricing.billingNote}</p>
        </div>
      </div>
    </section>
  );
}
