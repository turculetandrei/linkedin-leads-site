/** A plain app-window frame: three dots, a title, and a body. */
export function Window({
  title,
  children,
  className = "",
  label,
  aside,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  /** Right-hand content in the title bar. */
  aside?: React.ReactNode;
}) {
  return (
    <figure
      aria-label={label ?? title}
      className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(14,14,12,0.04),0_24px_60px_-28px_rgba(14,14,12,0.22)] ${className}`}
    >
      <div className="flex h-11 items-center justify-between gap-3 border-b border-line px-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </div>
          <span className="text-sm font-medium">{title}</span>
        </div>
        {aside}
      </div>
      {children}
    </figure>
  );
}
