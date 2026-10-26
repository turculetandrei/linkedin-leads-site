"use client";

import { m } from "motion/react";
import type { Lead } from "@/content";
import { Avatar } from "./Avatar";

const COLUMNS = ["Score", "Name", "Role", "Company", "Engagement", "Reason"];
const FIT_SCORE = 7;
const ease = [0.2, 0.7, 0.2, 1] as const;
const cell = "px-4 py-3.5 align-top first:pl-5 last:pr-5";

function Score({ value }: { value: number }) {
  const fit = value >= FIT_SCORE;
  return (
    <div className="flex items-center gap-2.5">
      <span className={`w-5 font-mono text-sm font-medium tabular-nums ${fit ? "text-accent" : "text-faint"}`}>
        {value}
      </span>
      <span className="hidden h-1 w-12 overflow-hidden rounded-full bg-sunken sm:block" aria-hidden="true">
        <span className={`block h-full rounded-full ${fit ? "bg-accent" : "bg-line-strong"}`} style={{ width: `${value * 10}%` }} />
      </span>
    </div>
  );
}

/** Rows fade in one by one the first time the table scrolls into view. */
function rowMotion(i: number) {
  return {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: 0.45, delay: 0.1 + i * 0.07, ease },
  };
}

/** Sample leads: a table from md, a stacked list on phones. */
export function LeadTable({ rows, caption }: { rows: Lead[]; caption: string }) {
  return (
    <>
      <ol aria-label={caption} className="md:hidden">
        {rows.map((lead, i) => (
          <m.li key={lead.name} className="border-b border-line px-5 py-4 last:border-b-0" {...rowMotion(i)}>
            <div className="flex items-center gap-3">
              <Avatar name={lead.name} />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-muted">
                  {lead.role}, {lead.company}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="sr-only">Score</span>
                <Score value={lead.score} />
              </div>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              <span className="text-faint">{lead.engagement}. </span>
              {lead.reason}
            </p>
          </m.li>
        ))}
      </ol>

      <div className="hidden md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line bg-sunken/60">
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className={`${cell} py-2.5 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-faint ${
                    column === "Engagement" ? "hidden lg:table-cell" : ""
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((lead, i) => (
              <m.tr key={lead.name} className="border-b border-line last:border-b-0" {...rowMotion(i)}>
                <td className={cell}>
                  <Score value={lead.score} />
                </td>
                <th scope="row" className={`${cell} font-medium`}>
                  <span className="flex items-center gap-2.5 whitespace-nowrap">
                    <Avatar name={lead.name} className="size-7 text-[0.625rem]" />
                    {lead.name}
                  </span>
                </th>
                <td className={`${cell} text-fg/80`}>{lead.role}</td>
                <td className={`${cell} text-fg/80`}>{lead.company}</td>
                <td className={`${cell} hidden whitespace-nowrap text-muted lg:table-cell`}>{lead.engagement}</td>
                <td className={`${cell} max-w-[24rem] text-muted`}>{lead.reason}</td>
              </m.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
