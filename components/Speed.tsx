"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";
import type { Niche } from "@/content";

const ease = [0.2, 0.7, 0.2, 1] as const;
const LINE_SECONDS = 1.2;

/** 4. Speed: a three-step timeline whose line draws from setup call to first leads. */
export function Speed({ niche }: { niche: Niche }) {
  const { speed } = niche;
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const count = speed.steps.length;

  return (
    <section aria-labelledby="speed-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-site">
        <p className="eyebrow">{speed.eyebrow}</p>
        <h2
          id="speed-title"
          className="mt-4 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-balance"
        >
          {speed.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">{speed.body}</p>

        <ol ref={ref} className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Base and accent lines: vertical on phones, horizontal from md */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.5625rem] w-px bg-line md:hidden" />
          <m.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.5625rem] w-px origin-top bg-accent md:hidden"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: inView ? 1 : 0 }}
            transition={{ duration: LINE_SECONDS, ease }}
          />
          <span aria-hidden="true" className="absolute top-[0.5625rem] right-0 left-0 hidden h-px bg-line md:block" />
          <m.span
            aria-hidden="true"
            className="absolute top-[0.5625rem] right-0 left-0 hidden h-px origin-left bg-accent md:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: LINE_SECONDS, ease }}
          />

          {speed.steps.map((step, i) => {
            const delay = (LINE_SECONDS * i) / count;
            return (
              <m.li
                key={step.title}
                className="relative pl-10 md:pl-0 md:pt-10"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay, ease }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 size-[1.125rem] rounded-full border-2 border-accent bg-bg"
                />
                <p className="font-mono text-xs text-accent">{step.when}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-muted text-pretty">{step.body}</p>
              </m.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
