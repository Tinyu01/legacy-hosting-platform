import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#020b19] pt-14 pb-6">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="text-[17px] font-semibold text-ink">
              Legacy <span className="text-highlight">Hosting</span>
            </p>
            <p className="mt-2.5 max-w-[220px] text-[13px] leading-[1.7] text-ink-dim">
              A Maleng Legacy Group company. Domains, hosting and cloud
              infrastructure, built for South African businesses.
            </p>
          </div>

          <div>
            <h4 className="mb-3.5 text-[12.5px] font-semibold text-ink-muted">
              Products
            </h4>
            <ul className="space-y-2.5 text-[13px] text-ink-dim">
              <li>
                <Link href="/domains" className="hover:text-ink-secondary">
                  Domains
                </Link>
              </li>
              <li>
                <Link href="/web-hosting" className="hover:text-ink-secondary">
                  Web Hosting
                </Link>
              </li>
              <li>
                <Link href="/cloud-vps" className="hover:text-ink-secondary">
                  Cloud VPS
                </Link>
              </li>
              <li>
                <Link href="/cloud-vps" className="hover:text-ink-secondary">
                  Managed VPS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-[12.5px] font-semibold text-ink-muted">
              Account
            </h4>
            <ul className="space-y-2.5 text-[13px] text-ink-dim">
              <li>
                <a
                  href="https://cloud.malenglegacy.co.za"
                  className="hover:text-ink-secondary"
                >
                  Client Portal
                </a>
              </li>
              <li>
                <span className="cursor-default">Billing</span>
              </li>
              <li>
                <span className="cursor-default">Support tickets</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-[12.5px] font-semibold text-ink-muted">
              Resources
            </h4>
            <ul className="space-y-2.5 text-[13px] text-ink-dim">
              <li>
                <a
                  href="https://tech.malenglegacy.co.za"
                  className="hover:text-ink-secondary"
                >
                  Maleng Legacy Tech
                </a>
              </li>
              <li>
                <span className="cursor-default">Knowledge base</span>
              </li>
              <li>
                <span className="cursor-default">Server status</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-[12.5px] font-semibold text-ink-muted">
              Legal
            </h4>
            <ul className="space-y-2.5 text-[13px] text-ink-dim">
              <li>Terms of service</li>
              <li>Privacy policy</li>
              <li>SLA</li>
              <li>Abuse policy</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border pt-5 text-[12px] text-[#4a5a78] sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Maleng Legacy Group. All rights
            reserved.
          </span>
          <span>tech.malenglegacy.co.za</span>
        </div>
      </div>
    </footer>
  );
}
