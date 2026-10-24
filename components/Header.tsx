import { CHECKOUT_URL, nav, PRODUCT_NAME } from "@/content";

export function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#111" stroke="#2e2e2e" />
      <rect x="7" y="9" width="18" height="3" rx="1.5" fill="#c8f05a" />
      <rect x="7" y="15" width="13" height="3" rx="1.5" fill="#ededed" />
      <rect x="7" y="21" width="8" height="3" rx="1.5" fill="#7a7a7a" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-[-0.02em]">
          <Logo />
          {PRODUCT_NAME}
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-fg sm:block"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CHECKOUT_URL}
            className="ml-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium transition-colors hover:border-fg/40"
          >
            {nav.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
