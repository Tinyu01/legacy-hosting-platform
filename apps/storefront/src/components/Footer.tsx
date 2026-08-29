import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#020b19] pt-14 pb-6">
      <div className="lh-container">
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
                <Link href="/email" className="hover:text-ink-secondary">
                  Email
                </Link>
              </li>
              <li>
                <Link
                  href="/dedicated-servers"
                  className="hover:text-ink-secondary"
                >
                  Dedicated Servers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-ink-secondary">
                  Pricing
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
                <Link href="/about" className="hover:text-ink-secondary">
                  About us
                </Link>
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
                <Link
                  href="/knowledge-base"
                  className="hover:text-ink-secondary"
                >
                  Knowledge base
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-ink-secondary">
                  Server status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-[12.5px] font-semibold text-ink-muted">
              Legal
            </h4>
            <ul className="space-y-2.5 text-[13px] text-ink-dim">
              <li>
                <Link href="/legal/terms" className="hover:text-ink-secondary">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-ink-secondary">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/legal/sla" className="hover:text-ink-secondary">
                  SLA
                </Link>
              </li>
              <li>
                <Link href="/legal/abuse" className="hover:text-ink-secondary">
                  Abuse policy
                </Link>
              </li>
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
