"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { terminal } from "@/content";
import { Window } from "./Window";

const CHAR_MS = 38;
const LINE_MS = 260;

/** Highlights the one number that matters: how many leads passed the ICP bar. */
function Line({ text }: { text: string }) {
  const match = text.match(/ICP YES \d+/);
  if (text.startsWith("---")) return <span className="text-faint">{text}</span>;
  if (!match || match.index === undefined) return <>{text}</>;
  return (
    <>
      {text.slice(0, match.index)}
      <span className="text-accent">{match[0]}</span>
      {text.slice(match.index + match[0].length)}
    </>
  );
}

/**
 * Replays a watch run: types the command, then prints the summary line by line.
 * Every line is rendered from the start (hidden until its turn) so the height never jumps.
 */
export function Terminal({ onDone, replayKey }: { onDone: () => void; replayKey: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();
  const total = terminal.command.length;
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setTyped(total);
      setShown(terminal.lines.length);
      onDone();
      return;
    }
    setTyped(0);
    setShown(0);
    const timers: number[] = [];
    for (let c = 1; c <= total; c++) timers.push(window.setTimeout(() => setTyped(c), 400 + c * CHAR_MS));
    const start = 400 + total * CHAR_MS + 450;
    terminal.lines.forEach((_, i) => timers.push(window.setTimeout(() => setShown(i + 1), start + i * LINE_MS)));
    timers.push(window.setTimeout(onDone, start + terminal.lines.length * LINE_MS + 200));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, total, onDone, replayKey]);

  const done = shown === terminal.lines.length;

  return (
    <div ref={ref}>
      <Window title={terminal.file} label="Terminal replay of a daily watch run">
        <pre className="sr-only">
          {`> ${terminal.command}\n${terminal.lines.join("\n")}`}
        </pre>
        <div
          aria-hidden="true"
          className="whitespace-pre-wrap break-words p-5 font-mono text-[0.75rem] leading-[1.75] text-fg/85 sm:p-6 sm:text-[0.8125rem]"
        >
          <div>
            <span className="text-faint">PS&gt; </span>
            {terminal.command.slice(0, typed)}
            {typed < total && <span className="caret ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-fg/80" />}
          </div>
          {terminal.lines.map((line, i) => (
            <div key={i} className={i < shown ? "" : "invisible"}>
              {line === "" ? " " : <Line text={line} />}
            </div>
          ))}
          <div className={done ? "" : "invisible"}>
            <span className="text-faint">PS&gt; </span>
            <span className="caret inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-fg/80" />
          </div>
        </div>
      </Window>
    </div>
  );
}
