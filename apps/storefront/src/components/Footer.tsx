import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-3 text-lg font-bold text-white">
              Legacy<span className="text-sky-400">Hosting</span>
            </p>
            <p className="text-sm text-slate-400">
              Infrastructure built for your next move.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-white">Products</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/domains" className="hover:text-sky-400">
                  Domains
                </Link>
              </li>
              <li>
                <Link href="/web-hosting" className="hover:text-sky-400">
                  Web Hosting
                </Link>
              </li>
              <li>
                <Link href="/cloud-vps" className="hover:text-sky-400">
                  Cloud VPS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-white">Company</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="https://tech.malenglegacy.co.za"
                  className="hover:text-sky-400"
                >
                  Maleng Legacy Tech
                </a>
              </li>
              <li>
                <a
                  href="https://cloud.malenglegacy.co.za"
                  className="hover:text-sky-400"
                >
                  Client Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-white">Support</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>ZAR Billing</li>
              <li>South African Support</li>
              <li>WhatsApp & Ticket</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Maleng Legacy Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
