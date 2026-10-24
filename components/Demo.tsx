"use client";

import { useCallback, useState } from "react";
import { demo, leads } from "@/content";
import { LeadTable } from "./LeadTable";
import { Reveal } from "./Reveal";
import { Terminal } from "./Terminal";
import { Window } from "./Window";

export function Demo() {
  const [finished, setFinished] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const onDone = useCallback(() => setFinished(true), []);

  const replay = () => {
    setFinished(false);
    setReplayKey((k) => k + 1);
  };

  return (
    <section id="demo" aria-labelledby="demo-title" className="border-t border-line py-28 sm:py-40">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{demo.eyebrow}</p>
            <h2 id="demo-title" className="section-title mt-4">
              {demo.title}
            </h2>
          </div>
          <p className="max-w-sm text-muted text-pretty md:text-right">{demo.body}</p>
        </div>

        <Reveal className="mt-14 sm:mt-16">
          <Terminal onDone={onDone} replayKey={replayKey} />
        </Reveal>

        <div className="mt-6">
          <Window title={`output/${demo.tableFile}`} label="Example lead list produced by the run">
            <LeadTable rows={leads} caption="Example lead list, best first" revealed={finished} />
          </Window>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-faint">{demo.footnote}</p>
          <button
            type="button"
            onClick={replay}
            disabled={!finished}
            className="rounded-full border border-line-strong px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-fg/40 hover:text-fg disabled:opacity-40"
          >
            Replay
          </button>
        </div>
      </div>
    </section>
  );
}
