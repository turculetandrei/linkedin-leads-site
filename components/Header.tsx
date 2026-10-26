import { LOGIN_URL, nav, PRODUCT_NAME, SIGNUP_URL } from "@/content";

/** Concentric rings with a hot centre: the working mark for the product. */
export function Logo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0e0e0c" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#faf9f6" strokeWidth="2" opacity=".35" />
      <circle cx="16" cy="16" r="5" fill="none" stroke="#faf9f6" strokeWidth="2" opacity=".7" />
      <circle cx="16" cy="16" r="2.25" fill="#e8562a" />
    </svg>
  );
}

/** Sticky top bar. `links` is false on pages without the landing sections (e.g. /welcome). */
export function Header({ links = true }: { links?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 font-semibold tracking-[-0.02em]">
          <Logo />
          {PRODUCT_NAME}
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {links &&
            nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hidden rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-fg md:block"
              >
                {link.label}
              </a>
            ))}
          <a href={LOGIN_URL} className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-fg">
            {nav.login}
          </a>
          {links && (
            <a
              href={SIGNUP_URL}
              className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 sm:block"
            >
              {nav.ctaShort}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
