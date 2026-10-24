"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";
import { how } from "@/content";

const ease = [0.2, 0.7, 0.2, 1] as const;
const LINE_SECONDS = 1.6;

/** The four steps as a flow: an accent line draws through them and lights each node as it passes. */
export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const count = how.steps.length;

  return (
    <section id="how" aria-labelledby="how-title" className="py-28 sm:py-40">
      <div className="container-site">
        <p className="eyebrow">{how.eyebrow}</p>
        <h2 id="how-title" className="section-title mt-4 max-w-3xl">
          {how.title}
        </h2>

        <ol ref={ref} className="relative mt-16 grid gap-12 sm:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* Base and accent lines: vertical below lg, horizontal from lg */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-line lg:hidden" />
          <m.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.6875rem] w-px origin-top bg-accent lg:hidden"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: inView ? 1 : 0 }}
            transition={{ duration: LINE_SECONDS, ease }}
          />
          <span aria-hidden="true" className="absolute top-[0.6875rem] right-0 left-0 hidden h-px bg-line lg:block" />
          <m.span
            aria-hidden="true"
            className="absolute top-[0.6875rem] right-0 left-0 hidden h-px origin-left bg-accent lg:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: LINE_SECONDS, ease }}
          />

          {how.steps.map((step, i) => {
            const delay = (LINE_SECONDS * i) / count;
            return (
              <m.li
                key={step.title}
                className="relative pl-12 lg:pl-0 lg:pt-14"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay, ease }}
              >
                <m.span
                  aria-hidden="true"
                  className="absolute top-0 left-0 grid size-[1.375rem] place-items-center rounded-full border bg-bg font-mono text-[0.625rem]"
                  initial={{ borderColor: "#2e2e2e", color: "#9a9a9a" }}
                  animate={inView ? { borderColor: "#c8f05a", color: "#c8f05a" } : undefined}
                  transition={{ duration: 0.3, delay: delay + 0.15 }}
                >
                  {i + 1}
                </m.span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-muted text-pretty">{step.body}</p>
                <p className="mt-5 inline-block max-w-full rounded-md break-words border border-line bg-surface px-2.5 py-1.5 font-mono text-xs text-fg/80">
                  {step.detail}
                </p>
              </m.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
