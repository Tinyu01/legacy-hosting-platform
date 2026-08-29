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

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-[13px] font-medium text-ink-secondary transition hover:bg-soft hover:text-ink"
    >
      {children}
    </Link>
  );
}

function DropdownLink({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2.5 transition hover:bg-soft"
    >
      <p className="text-[13px] font-semibold text-ink">{title}</p>
      <p className="text-[12px] text-ink-dim">{desc}</p>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary/90 backdrop-blur-md">
      {/* Top bar */}
      <div className="hidden border-b border-border bg-[#020b19] sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-1.5 text-[11px] text-ink-dim sm:px-6 lg:px-8">
          <span>Maleng Legacy Group</span>
          <div className="flex items-center gap-5">
            <span>ZAR · VAT where applicable</span>
            <a
              href="https://cloud.malenglegacy.co.za"
              className="hover:text-highlight"
            >
              Client Portal
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="h-[26px] w-[26px] shrink-0 rounded-[7px] bg-gradient-to-br from-highlight to-[#0d8f8e]" />
            <span className="text-[17px] font-semibold tracking-tight text-ink">
              Legacy Hosting
            </span>
          </Link>

          {/* Contabo-style primary nav */}
          <nav
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="Primary"
          >
            <NavLink href="/cloud-vps">VPS</NavLink>

            <NavLink href="/cloud-vps">Dedicated Server</NavLink>

            {/* Apps & Panels */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-ink-secondary transition hover:bg-soft hover:text-ink"
              >
                Apps & Panels
                <ChevronDown />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-64 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-border bg-surface py-2 shadow-2xl">
                  <DropdownLink
                    href="/web-hosting"
                    title="Web Hosting"
                    desc="Shared & Managed WordPress"
                  />
                  <DropdownLink
                    href="/web-hosting"
                    title="cPanel / Hestia"
                    desc="Control panels on hosting plans"
                  />
                  <DropdownLink
                    href="/cloud-vps"
                    title="Managed VPS"
                    desc="We patch, monitor and secure"
                  />
                </div>
              </div>
            </div>

            {/* More */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-ink-secondary transition hover:bg-soft hover:text-ink"
              >
                More
                <ChevronDown />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-[280px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-border bg-surface py-2 shadow-2xl">
                  <DropdownLink
                    href="/domains"
                    title="Domains"
                    desc="Register, transfer & DNS"
                  />
                  <DropdownLink
                    href="/web-hosting"
                    title="Email"
                    desc="Business mailboxes on your domain"
                  />
                  <DropdownLink
                    href="/cloud-vps"
                    title="Backups & SSL"
                    desc="Infrastructure add-ons"
                  />
                  <DropdownLink
                    href="/cloud-vps"
                    title="Object storage"
                    desc="Coming after core checkout"
                  />
                </div>
              </div>
            </div>

            <NavLink href="/cloud-vps">Pricing</NavLink>

            {/* Company */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-ink-secondary transition hover:bg-soft hover:text-ink"
              >
                Company
                <ChevronDown />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-56 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
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
                    Maleng Legacy Group
                  </a>
                  <Link
                    href="/"
                    className="block px-4 py-2 text-[13px] text-ink-secondary hover:bg-soft hover:text-ink"
                  >
                    About Legacy Hosting
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

          {/* Compact nav for md–lg */}
          <nav
            className="hidden items-center gap-0.5 lg:flex xl:hidden"
            aria-label="Primary compact"
          >
            <NavLink href="/cloud-vps">VPS</NavLink>
            <NavLink href="/web-hosting">Hosting</NavLink>
            <NavLink href="/domains">Domains</NavLink>
            <NavLink href="/cloud-vps">Pricing</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://cloud.malenglegacy.co.za"
            className="hidden text-[13.5px] font-medium text-ink-secondary transition hover:text-ink sm:inline"
          >
            Log in
          </a>
          <Link href="/cloud-vps" className="lh-btn-primary !py-2 !text-[13px]">
            Get started
          </Link>
        </div>
      </div>

      {/* Mobile strip — Contabo-style labels */}
      <nav
        className="flex gap-1 overflow-x-auto border-t border-border px-4 py-2 lg:hidden"
        aria-label="Products"
      >
        {[
          { href: "/cloud-vps", label: "VPS" },
          { href: "/cloud-vps", label: "Dedicated" },
          { href: "/web-hosting", label: "Apps & Panels" },
          { href: "/domains", label: "Domains" },
          { href: "/cloud-vps", label: "Pricing" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="shrink-0 rounded-full border border-border bg-soft px-3 py-1.5 text-[12px] font-medium text-ink-secondary"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
