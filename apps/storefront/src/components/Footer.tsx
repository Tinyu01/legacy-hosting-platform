import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-[16px] font-bold tracking-tight text-white">
              Legacy <span className="text-highlight">Hosting</span>
            </p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-gray-400">
              Domains, web hosting and cloud infrastructure for South African
              businesses. Catalogue-driven products with ZAR billing.
            </p>
            <p className="mt-4 text-[12px] text-gray-500">
              A Maleng Legacy Group company
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              Products
            </p>
            <ul className="mt-4 space-y-2.5 text-[13px] text-gray-400">
              <li>
                <Link href="/domains" className="hover:text-highlight">
                  Domains
                </Link>
              </li>
              <li>
                <Link href="/web-hosting" className="hover:text-highlight">
                  Web Hosting
                </Link>
              </li>
              <li>
                <Link href="/cloud-vps" className="hover:text-highlight">
                  Cloud VPS
                </Link>
              </li>
              <li>
                <Link href="/cloud-vps" className="hover:text-highlight">
                  Managed VPS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              Account
            </p>
            <ul className="mt-4 space-y-2.5 text-[13px] text-gray-400">
              <li>
                <a
                  href="https://cloud.malenglegacy.co.za"
                  className="hover:text-highlight"
                >
                  Client Portal
                </a>
              </li>
              <li>
                <a
                  href="https://tech.malenglegacy.co.za"
                  className="hover:text-highlight"
                >
                  Maleng Legacy Tech
                </a>
              </li>
              <li>
                <a
                  href="https://malenglegacy.co.za"
                  className="hover:text-highlight"
                >
                  Group website
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              Support & legal
            </p>
            <ul className="mt-4 space-y-2.5 text-[13px] text-gray-400">
              <li>Help Centre</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Acceptable Use</li>
              <li>SLA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[12px] text-gray-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Maleng Legacy Group (Pty) Ltd. All
            rights reserved.
          </p>
          <p>Prices in ZAR · VAT inclusive where applicable</p>
        </div>
      </div>
    </footer>
  );
}
