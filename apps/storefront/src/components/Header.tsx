import Link from "next/link";

const primaryNav = [
  { href: "/domains", label: "Domains" },
  { href: "/web-hosting", label: "Web Hosting" },
  { href: "/cloud-vps", label: "Cloud VPS" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-[15px] font-semibold tracking-tight text-white">
            Legacy <span className="text-highlight">Hosting</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-gray-400 transition hover:text-highlight"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://cloud.malenglegacy.co.za"
            className="hidden text-[13px] font-medium text-gray-400 transition hover:text-white sm:inline"
          >
            Login
          </a>
          <Link href="/domains" className="lh-btn-primary !py-1.5 !text-[13px]">
            Get started
          </Link>
        </div>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-white/5 px-5 py-2 md:hidden"
        aria-label="Products"
      >
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-3 py-1.5 text-[12px] font-medium text-gray-400 hover:bg-white/5 hover:text-highlight"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
