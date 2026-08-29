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

const primaryServices = [
  { href: "/domains", label: "Domains" },
  { href: "/web-hosting", label: "Web Hosting" },
  { href: "/cloud-vps", label: "Cloud VPS" },
  { href: "/email", label: "Email" },
  { href: "/dedicated-servers", label: "Dedicated" },
];

export function Header() {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[60] h-1 bg-gradient-to-r from-highlight to-accent" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-primary/80 backdrop-blur-md">
        <div className="hidden border-b border-white/5 bg-secondary/50 sm:block">
          <div className="lh-shell flex h-10 items-center justify-between text-[13px] text-gray-400">
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">Maleng Legacy Group</span>
              <a
                href="https://tech.malenglegacy.co.za"
                className="transition hover:text-accent"
              >
                Tech & Consulting
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="hidden sm:inline">Support in SAST</span>
              <span className="hidden md:inline">Pay in ZAR</span>
              <a
                href="https://cloud.malenglegacy.co.za"
                className="transition hover:text-accent"
              >
                Client Portal
              </a>
            </div>
          </div>
        </div>

        <div className="lh-shell flex h-[4.25rem] items-center justify-between">
          <div className="flex min-w-0 items-center gap-6 lg:gap-10">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-gold text-lg font-bold text-white shadow-lg shadow-accent/40">
                LH
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-bold text-white">
                  Legacy Hosting
                </span>
                <span className="block text-xs font-normal text-gray-400">
                  Part of Maleng Legacy Group
                </span>
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
                  className="group relative rounded-lg px-3.5 py-2 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 origin-left scale-x-0 bg-accent transition-transform group-hover:scale-x-100" />
                </Link>
              ))}

              <Link
                href="/pricing"
                className="group relative rounded-lg px-3.5 py-2 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Pricing
                <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 origin-left scale-x-0 bg-accent transition-transform group-hover:scale-x-100" />
              </Link>

              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  Company
                  <ChevronDown />
                </button>
                <div className="invisible absolute left-0 top-full z-50 w-52 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-white/10 bg-surface py-2 shadow-xl">
                    <Link
                      href="/about"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      About us
                    </Link>
                    <a
                      href="https://tech.malenglegacy.co.za"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      Maleng Legacy Tech
                    </a>
                    <a
                      href="https://malenglegacy.co.za"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      Group website
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <a
              href="https://cloud.malenglegacy.co.za"
              className="hidden text-sm font-medium text-gray-300 transition hover:text-white md:inline"
            >
              Log in
            </a>
            <Link
              href="/domains"
              className="rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-accent/30"
            >
              Get Started
            </Link>
          </div>
        </div>

        <nav
          className="flex gap-1.5 overflow-x-auto border-t border-white/5 px-6 py-2.5 lg:hidden"
          aria-label="Services"
        >
          {[...primaryServices, { href: "/pricing", label: "Pricing" }].map(
            (item) => (
              <Link
                key={item.label}
                href={item.href}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-gray-300 transition hover:border-highlight/40 hover:text-highlight"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </header>
    </>
  );
}
