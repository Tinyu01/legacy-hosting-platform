import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#1c2129] bg-[#0a0c10]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-[15px] font-semibold tracking-tight text-white">
              Legacy Hosting
            </p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-[#8b93a1]">
              Domains, web hosting and cloud infrastructure for South African
              businesses. Part of Maleng Legacy Group.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5c6573]">
              Products
            </p>
            <ul className="mt-4 space-y-2.5 text-[13px] text-[#8b93a1]">
              <li>
                <Link href="/domains" className="hover:text-white">
                  Domains
                </Link>
              </li>
              <li>
                <Link href="/web-hosting" className="hover:text-white">
                  Web Hosting
                </Link>
              </li>
              <li>
                <Link href="/cloud-vps" className="hover:text-white">
                  Cloud VPS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5c6573]">
              Account
            </p>
            <ul className="mt-4 space-y-2.5 text-[13px] text-[#8b93a1]">
              <li>
                <a
                  href="https://cloud.malenglegacy.co.za"
                  className="hover:text-white"
                >
                  Client Portal
                </a>
              </li>
              <li>
                <a
                  href="https://tech.malenglegacy.co.za"
                  className="hover:text-white"
                >
                  Maleng Legacy Tech
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5c6573]">
              Support & legal
            </p>
            <ul className="mt-4 space-y-2.5 text-[13px] text-[#8b93a1]">
              <li>Help Centre</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Acceptable Use</li>
              <li>SLA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#1c2129] pt-6 text-[12px] text-[#5c6573] sm:flex-row sm:items-center">
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
