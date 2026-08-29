import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

function ChevronDown() {
  return (
    <svg className="h-3.5 w-3.5 opacity-60" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** HostAfrica-style: services stay visible in the bar. */
const primaryServices = [
  { href: "/domains", label: "Domains" },
  { href: "/web-hosting", label: "Web Hosting" },
  { href: "/cloud-vps", label: "Cloud VPS" },
  { href: "/web-hosting", label: "Email" },
  { href: "/cloud-vps", label: "Dedicated" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary/95 backdrop-blur-md">
      <div className="hidden border-b border-border bg-[#020b19] sm:block">
        <div className="lh-container flex items-center justify-between py-1.5 text-[11px] text-ink-dim">
          <div className="flex items-center gap-4">
            <span>Maleng Legacy Group</span>
            <span className="hidden text-ink-dim md:inline">·</span>
            <a
              href="https://tech.malenglegacy.co.za"
              className="hidden hover:text-highlight md:inline"
            >
              Tech & Consulting
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span>Support in SAST</span>
            <span>Pay in ZAR</span>
            <a
              href="https://cloud.malenglegacy.co.za"
              className="font-medium text-ink-muted hover:text-highlight"
            >
              Client Portal
            </a>
          </div>
        </div>
      </div>

      <div className="lh-container flex h-16 items-center justify-between">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-highlight to-[#0d8f8e]" />
            <span className="text-[16px] font-bold tracking-tight text-ink">
              Legacy <span className="text-highlight">Hosting</span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Services"
          >
            {primaryServices.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-ink-secondary transition hover:bg-soft hover:text-highlight"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/cloud-vps"
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-ink-secondary transition hover:bg-soft hover:text-highlight"
            >
              Pricing
            </Link>

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-ink-secondary transition hover:bg-soft hover:text-ink"
              >
                Company
                <ChevronDown />
              </button>
              <div className="invisible absolute right-0 top-full z-50 w-52 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-border bg-surface py-2 shadow-xl">
                  <a
                    href="https://tech.malenglegacy.co.za"
                    className="block px-4 py-2 text-[13px] text-ink-secondary hover:bg-soft hover:text-ink"
                  >
                    Maleng Legacy Tech
                  </a>
                  <a
                    href="https://malenglegacy.co.za"
                    className="block px-4 py-2 text-[13px] text-ink-secondary hover:bg-soft hover:text-ink"
                  >
                    Group website
                  </a>
                  <Link
                    href="/"
                    className="block px-4 py-2 text-[13px] text-ink-secondary hover:bg-soft hover:text-ink"
                  >
                    About us
                  </Link>
                  <Link
                    href="/"
                    className="block px-4 py-2 text-[13px] text-ink-secondary hover:bg-soft hover:text-ink"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href="https://cloud.malenglegacy.co.za"
            className="hidden text-[13px] font-medium text-ink-secondary transition hover:text-ink md:inline"
          >
            Log in
          </a>
          <Link
            href="/domains"
            className="lh-btn-primary !py-2 !px-4 !text-[13px]"
          >
            Get started
          </Link>
        </div>
      </div>

      <nav
        className="flex gap-1.5 overflow-x-auto border-t border-border px-6 py-2.5 lg:hidden"
        aria-label="Services"
      >
        {[...primaryServices, { href: "/cloud-vps", label: "Pricing" }].map(
          (item) => (
            <Link
              key={item.label}
              href={item.href}
              className="shrink-0 rounded-full border border-border bg-soft px-3.5 py-1.5 text-[12px] font-semibold text-ink-secondary transition hover:border-highlight/40 hover:text-highlight"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
