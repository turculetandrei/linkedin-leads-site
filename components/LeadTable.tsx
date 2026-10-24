"use client";

import { m } from "motion/react";
import { demo, type Lead } from "@/content";

type Props = {
  rows: Lead[];
  caption: string;
  /** "hero" hides the long columns on smaller screens; "full" keeps every column and scrolls sideways. */
  variant?: "hero" | "full";
  /** When set, rows fade in one by one once this turns true. */
  revealed?: boolean;
};

const cell = "px-4 py-3.5 align-top first:pl-5 last:pr-5";

function Score({ value }: { value: number }) {
  const fit = value >= demo.minScore;
  return (
    <div className="flex items-center gap-2.5">
      <span className={`w-5 font-mono text-sm tabular-nums ${fit ? "text-accent" : "text-muted"}`}>{value}</span>
      <span className="hidden h-1 w-12 overflow-hidden rounded-full bg-line sm:block" aria-hidden="true">
        <span
          className={`block h-full rounded-full ${fit ? "bg-accent" : "bg-faint"}`}
          style={{ width: `${value * 10}%` }}
        />
      </span>
    </div>
  );
}

export function LeadTable({ rows, caption, variant = "full", revealed }: Props) {
  const hero = variant === "hero";
  const animated = revealed !== undefined;
  // Long columns: always shown in the full table; in the hero, Role and Company from md, the rest from lg
  const role = hero ? "hidden md:table-cell" : "";
  const company = hero ? "hidden md:table-cell" : "";
  const engagement = hero ? "hidden lg:table-cell" : "";
  const reason = hero ? "hidden lg:table-cell" : "";
  const columnClass = ["", "", role, company, engagement, reason];

  return (
    <>
      {!hero && <LeadList rows={rows} caption={caption} revealed={revealed} />}
      <div
        className={hero ? "" : "hidden overflow-x-auto md:block"}
        {...(hero ? {} : { tabIndex: 0, role: "region", "aria-label": `${caption} (scrolls sideways)` })}
      >
        <table className={`w-full border-collapse text-left text-sm ${hero ? "" : "min-w-[52rem]"}`}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              {demo.tableColumns.map((column, i) => (
                <th
                  key={column}
                  scope="col"
                  className={`${cell} py-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-muted ${columnClass[i]}`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((lead, i) => (
              <m.tr
                key={lead.name}
                className="border-b border-line last:border-b-0"
                initial={animated ? { opacity: 0, y: 8 } : false}
                animate={animated && revealed ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <td className={cell}>
                  <Score value={lead.score} />
                </td>
                <th scope="row" className={`${cell} whitespace-nowrap font-medium text-fg`}>
                  {lead.name}
                  {hero && (
                    <span className="block whitespace-normal font-normal text-muted md:hidden">
                      {lead.role}, {lead.company}
                    </span>
                  )}
                </th>
                <td className={`${cell} text-fg/80 ${role}`}>{lead.role}</td>
                <td className={`${cell} whitespace-nowrap text-fg/80 ${company}`}>{lead.company}</td>
                <td className={`${cell} whitespace-nowrap text-muted ${engagement}`}>{lead.engagement}</td>
                <td className={`${cell} max-w-[26rem] text-muted ${reason}`}>{lead.reason}</td>
              </m.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** Phones get the full table as a stacked list instead of a sideways scroll. */
function LeadList({ rows, caption, revealed }: Pick<Props, "rows" | "caption" | "revealed">) {
  const animated = revealed !== undefined;
  return (
    <ol aria-label={caption} className="md:hidden">
      {rows.map((lead, i) => (
        <m.li
          key={lead.name}
          className="border-b border-line px-5 py-4 last:border-b-0"
          initial={animated ? { opacity: 0, y: 8 } : false}
          animate={animated && revealed ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.45, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-medium">{lead.name}</p>
            <div className="flex items-center gap-1">
              <span className="sr-only">Score</span>
              <Score value={lead.score} />
            </div>
          </div>
          <p className="mt-0.5 text-sm text-fg/80">
            {lead.role}
            {lead.company !== "—" && `, ${lead.company}`}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <span className="text-faint">{lead.engagement}. </span>
            {lead.reason}
          </p>
        </m.li>
      ))}
    </ol>
  );
}
