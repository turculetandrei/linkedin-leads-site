import { facts } from "@/content";
import { Reveal } from "./Reveal";

export function Facts() {
  const last = facts.items.length - 1;
  return (
    <section aria-labelledby="facts-title" className="border-t border-line py-28 sm:py-40">
      <div className="container-site">
        <p className="eyebrow">{facts.eyebrow}</p>
        <h2 id="facts-title" className="section-title mt-4">
          {facts.title}
        </h2>

        {/* Hairline grid: 1px gaps over the line colour draw the borders */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {facts.items.map((item, i) => {
            const price = i === last;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={(i % 4) * 0.06}
                className={`flex min-h-44 flex-col justify-between gap-8 bg-bg p-6 sm:p-7 ${
                  price ? "md:col-span-2" : ""
                }`}
              >
                <span aria-hidden="true" className={`font-mono text-xs ${price ? "text-accent" : "text-faint"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={`font-semibold tracking-[-0.02em] ${price ? "text-3xl sm:text-4xl" : "text-xl"}`}>
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted text-pretty">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
