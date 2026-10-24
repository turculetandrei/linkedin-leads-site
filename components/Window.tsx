/** A plain app-window frame: three dots, a file name, and a body. */
export function Window({
  title,
  children,
  className = "",
  label,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <figure
      aria-label={label ?? title}
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_40px_120px_-40px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex h-10 items-center gap-3 border-b border-line px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <span className="font-mono text-xs text-muted">{title}</span>
      </div>
      {children}
    </figure>
  );
}
