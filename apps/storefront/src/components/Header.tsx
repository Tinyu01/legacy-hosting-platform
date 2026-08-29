import Link from "next/link";

function ChevronDown() {
  return (
    <svg className="h-3.5 w-3.5 opacity-60" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg className="h-5 w-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.5 3.75 5.5 3.75 9S14.5 18.5 12 21c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3z" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg className="h-5 w-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a3 3 0 013-3m16.5 0a3 3 0 00-3-3m0 0V6.75A2.25 2.25 0 0016.5 4.5h-9A2.25 2.25 0 005.25 6.75v.75" />
    </svg>
  );
}

function IconCloud() {
  return (
    <svg className="h-5 w-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.48-7.2 5.25 5.25 0 00-10.23-2.33A4.5 4.5 0 002.25 15z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="h-5 w-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="h-5 w-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg className="h-5 w-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  );
}

const products = [
  {
    href: "/domains",
    title: "Domains",
    desc: "Register, transfer & DNS",
    icon: <IconGlobe />,
  },
  {
    href: "/web-hosting",
    title: "Web Hosting",
    desc: "Shared & Managed WordPress",
    icon: <IconServer />,
  },
  {
    href: "/cloud-vps",
    title: "Cloud VPS",
    desc: "Root access, NVMe, snapshots",
    icon: <IconCloud />,
  },
  {
    href: "/cloud-vps",
    title: "Managed VPS",
    desc: "Patching & monitoring add-on",
    icon: <IconShield />,
  },
  {
    href: "/web-hosting",
    title: "Email",
    desc: "Business mailboxes",
    icon: <IconMail />,
  },
  {
    href: "/cloud-vps",
    title: "Infrastructure",
    desc: "Backups, SSL, DNS",
    icon: <IconLayers />,
  },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary/95 backdrop-blur-md">
      {/* Top bar */}
      <div className="hidden border-b border-white/5 bg-surface/80 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-1.5 text-[11px] text-gray-500 sm:px-6 lg:px-8">
          <span>Part of Maleng Legacy Group · tech.malenglegacy.co.za</span>
          <div className="flex items-center gap-4">
            <span>ZAR · VAT inclusive</span>
            <a href="https://cloud.malenglegacy.co.za" className="hover:text-highlight">
              Client Portal
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[16px] font-bold tracking-tight text-white">
            Legacy <span className="text-highlight">Hosting</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {/* Products mega */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Products
                <ChevronDown />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-[520px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-white/10 bg-surface p-3 shadow-2xl shadow-black/40">
                  <div className="grid grid-cols-2 gap-1">
                    {products.map((p) => (
                      <Link
                        key={p.title}
                        href={p.href}
                        className="flex gap-3 rounded-xl p-3 transition hover:bg-white/5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-highlight/10">
                          {p.icon}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-white">{p.title}</p>
                          <p className="text-[12px] text-gray-500">{p.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 border-t border-white/5 px-3 py-2">
                    <Link href="/cloud-vps" className="text-[12px] font-semibold text-highlight hover:text-highlight/80">
                      View all Cloud VPS plans →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/domains"
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
              Domains
            </Link>
            <Link
              href="/web-hosting"
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
              Web Hosting
            </Link>
            <Link
              href="/cloud-vps"
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
              Cloud VPS
            </Link>

            {/* Company */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Company
                <ChevronDown />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-56 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-white/10 bg-surface py-2 shadow-xl">
                  <a
                    href="https://tech.malenglegacy.co.za"
                    className="block px-4 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    Maleng Legacy Tech
                  </a>
                  <a
                    href="https://malenglegacy.co.za"
                    className="block px-4 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    Maleng Legacy Group
                  </a>
                  <Link
                    href="/"
                    className="block px-4 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    About Legacy Hosting
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://cloud.malenglegacy.co.za"
            className="hidden text-[13px] font-medium text-gray-400 transition hover:text-white sm:inline"
          >
            Login
          </a>
          <Link href="/domains" className="lh-btn-primary !py-2 !text-[13px]">
            Get started
          </Link>
        </div>
      </div>

      {/* Mobile product strip */}
      <nav
        className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 lg:hidden"
        aria-label="Products"
      >
        {["/domains", "/web-hosting", "/cloud-vps"].map((href, i) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-gray-300"
          >
            {["Domains", "Web Hosting", "Cloud VPS"][i]}
          </Link>
        ))}
      </nav>
    </header>
  );
}
