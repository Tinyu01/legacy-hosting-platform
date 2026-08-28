import Link from "next/link";

const nav = [
  { href: "/domains", label: "Domains" },
  { href: "/web-hosting", label: "Web Hosting" },
  { href: "/cloud-vps", label: "Cloud VPS" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1c2129] bg-[#0a0c10]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Legacy Hosting
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-[#8b93a1] transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://cloud.malenglegacy.co.za"
            className="hidden text-[13px] font-medium text-[#8b93a1] transition hover:text-white sm:inline"
          >
            Login
          </a>
          <Link
            href="/cloud-vps"
            className="rounded-md bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-blue-500"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
