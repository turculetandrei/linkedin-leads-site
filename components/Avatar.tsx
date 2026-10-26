// Invented people get initials, never photos.
const tones = ["bg-[#ece9e2]", "bg-[#e4e8e3]", "bg-[#e6e4ec]", "bg-[#efe6df]", "bg-[#e2e7ea]"];

export function Avatar({ name, className = "size-8 text-xs" }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  const tone = tones[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % tones.length];
  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-full font-medium text-muted ${tone} ${className}`}
    >
      {initials}
    </span>
  );
}
