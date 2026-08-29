import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";
import { FinalCTA } from "../../components/FinalCTA";

export const metadata = {
  title: "About",
  description:
    "Legacy Hosting is a Maleng Legacy Group company — domains, hosting and cloud in Rand.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        badge="Company"
        title="Infrastructure for"
        highlight="South African business"
        description="Legacy Hosting is the commercial hosting and cloud arm of Maleng Legacy Group. We sell domains, web hosting and Cloud VPS with ZAR billing and local support hours."
        breadcrumb={[{ label: "About" }]}
        cta={{ text: "View products", href: "/pricing" }}
        ctaSecondary={{
          text: "Maleng Legacy Tech",
          href: "https://tech.malenglegacy.co.za",
        }}
      />

      <section className="py-14 md:py-20">
        <div className="lh-container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
                Who we are
              </span>
              <h2 className="text-3xl font-bold text-white">
                Part of{" "}
                <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                  Maleng Legacy Group
                </span>
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Maleng Legacy Tech & Consulting delivers software engineering,
                cybersecurity and managed infrastructure. Legacy Hosting is the
                productised storefront for domains, hosting and cloud — so you can
                buy and renew without a custom project every time.
              </p>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Providers stay behind the platform. You see Legacy Hosting plans,
                locations and ZAR prices — not supplier brands.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  t: "Domains",
                  d: "Register and manage .co.za, .com and more.",
                  href: "/domains",
                },
                {
                  t: "Web Hosting",
                  d: "Shared and Managed WordPress in ZAR.",
                  href: "/web-hosting",
                },
                {
                  t: "Cloud VPS",
                  d: "Root access, NVMe, snapshots.",
                  href: "/cloud-vps",
                },
                {
                  t: "Pricing",
                  d: "One place for every commercial table.",
                  href: "/pricing",
                },
              ].map((c) => (
                <Link
                  key={c.t}
                  href={c.href}
                  className="rounded-2xl border border-white/10 bg-surface/50 p-5 transition hover:border-highlight/40"
                >
                  <h3 className="font-semibold text-white">{c.t}</h3>
                  <p className="mt-1 text-sm text-gray-400">{c.d}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 border-t border-white/10 pt-12 sm:grid-cols-3">
            {[
              { t: "Catalogue-driven", d: "Products live in hosting-catalog.json — UI never hard-codes supplier SKUs." },
              { t: "ZAR & SAST", d: "Billing and support oriented to South African businesses." },
              { t: "Portal next", d: "cloud.malenglegacy.co.za for servers, DNS and invoices after checkout." },
            ].map((x) => (
              <div key={x.t}>
                <h3 className="font-semibold text-white">{x.t}</h3>
                <p className="mt-2 text-sm text-gray-400">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
