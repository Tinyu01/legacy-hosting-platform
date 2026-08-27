import Link from "next/link";

const nav = [
  { href: "/domains", label: "Domains" },
  { href: "/web-hosting", label: "Web Hosting" },
  { href: "/cloud-vps", label: "Cloud VPS" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-white">
            Legacy<span className="text-sky-400">Hosting</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-sky-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://cloud.malenglegacy.co.za"
            className="hidden text-sm text-slate-400 transition hover:text-white sm:inline"
          >
            Client Portal
          </a>
          <Link
            href="/cloud-vps"
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Deploy
          </Link>
        </div>
      </div>
    </header>
  );
}
