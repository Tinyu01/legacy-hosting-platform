import Link from "next/link";
import {
  formatZAR,
  getActiveDomainProducts,
  getActiveVpsProducts,
  getActiveWebHostingProducts,
} from "../lib/catalog";
import { HowItWorks } from "../components/HowItWorks";
import { FinalCTA } from "../components/FinalCTA";
import { DomainSearch } from "../components/DomainSearch";
import { VpsPlanCard } from "../components/VpsPlanCard";
import { SectionHeading } from "../components/SectionHeading";

export default function HomePage() {
  const domains = getActiveDomainProducts().slice(0, 4);
  const vpsPlans = getActiveVpsProducts().slice(0, 4);
  const hosting = getActiveWebHostingProducts().slice(0, 3);
  const coza = domains.find((d) => d.slug === "co-za") ?? domains[0];

  return (
    <main>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-highlight/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
                <span className="text-[12px] font-bold uppercase tracking-wider text-accent">
                  Legacy Hosting · South Africa
                </span>
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                Domains, hosting & cloud VPS{" "}
                <span className="gradient-text">built to convert</span>
              </h1>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-muted">
                Fast infrastructure, ZAR pricing, and a single account for
                everything your business ships online — from .co.za to root
                servers.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/domains" className="lh-btn-primary">
                  Get Started
                </Link>
                <Link href="/cloud-vps" className="lh-btn-secondary">
                  View Cloud VPS
                </Link>
              </div>

              <div className="mt-8">
                <DomainSearch />
              </div>
              <p className="mt-2 text-[12px] text-ink-dim">
                .co.za from{" "}
                {coza?.pricing.registration
                  ? formatZAR(coza.pricing.registration)
                  : "R149"}{" "}
                / year
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "10+", l: "Products live" },
                { v: "24/7", l: "Portal access" },
                { v: "~10 min", l: "Avg. VPS deploy" },
                { v: "99.9%", l: "Target uptime" },
              ].map((m) => (
                <div key={m.l} className="lh-card p-5">
                  <p className="text-2xl font-black text-highlight">{m.v}</p>
                  <p className="mt-1 text-[12px] font-medium text-ink-muted">{m.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core product lines */}
      <section className="border-b border-border bg-gradient-to-b from-primary via-primary to-soft/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our products"
            title="Core"
            highlight="product lines"
            description="Each line is catalogue-driven — specialised products, clear pricing, one checkout path."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Domains",
                body: "Search, register, transfer. DNS included.",
                href: "/domains",
                emoji: "🌐",
                count: `${domains.length}+ TLDs`,
              },
              {
                title: "Web Hosting",
                body: "NVMe, SSL, email, Managed WordPress.",
                href: "/web-hosting",
                emoji: "🖥️",
                count: `${hosting.length} plans`,
              },
              {
                title: "Cloud VPS",
                body: "Root access, snapshots, firewall, metrics.",
                href: "/cloud-vps",
                emoji: "☁️",
                count: `${vpsPlans.length}+ sizes`,
              },
              {
                title: "Managed",
                body: "Optional ops layer on any cloud server.",
                href: "/cloud-vps",
                emoji: "🛡️",
                count: "Add-on",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="lh-card group relative overflow-hidden p-6 transition hover:border-highlight/40 hover:shadow-lg hover:shadow-highlight/10"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-highlight/30 bg-gradient-to-br from-highlight/20 to-accent/20 text-3xl">
                  {item.emoji}
                </div>
                <h3 className="text-xl font-bold text-ink group-hover:text-highlight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                  {item.body}
                </p>
                <p className="mt-4 text-[12px] font-semibold text-highlight">
                  {item.count} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured VPS — VpsPlanCard */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Featured"
            title="Cloud VPS —"
            highlight="fast & flexible"
            description="Scalable virtual servers with root access. Priced in ZAR."
            action={
              <Link
                href="/cloud-vps"
                className="text-[13px] font-semibold text-highlight hover:underline"
              >
                All plans →
              </Link>
            }
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {vpsPlans.map((plan) => (
              <VpsPlanCard key={plan.id} plan={plan} compact />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Web hosting */}
      <section className="border-b border-border bg-surface/50 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <SectionHeading title="Web Hosting" description="Shared & Managed WordPress" />
          <div className="grid gap-4 md:grid-cols-3">
            {hosting.map((plan) => (
              <div key={plan.id} className="lh-card p-6">
                <h3 className="text-[15px] font-semibold text-ink">{plan.name}</h3>
                <p className="mt-4 text-2xl font-bold text-highlight">
                  {plan.pricing.monthly ? formatZAR(plan.pricing.monthly) : "—"}
                  <span className="text-[13px] font-normal text-ink-dim">/mo</span>
                </p>
                <p className="mt-2 line-clamp-2 text-[13px] text-ink-muted">
                  {plan.description}
                </p>
                <Link
                  href="/web-hosting"
                  className="mt-5 inline-block text-[13px] font-semibold text-highlight"
                >
                  Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Trust */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-ink sm:text-2xl">
            Why operators choose Legacy Hosting
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "ZAR billing", b: "PayFast, Ozow and EFT. VAT-inclusive where applicable." },
              { t: "Local support", b: "South African context — clear escalation, business hours." },
              { t: "One platform", b: "Domains, hosting and VPS under a single account." },
              { t: "Fast deploy", b: "Cloud VPS with root, snapshots and firewall from day one." },
              { t: "Managed option", b: "Self-manage or add Managed Service for patching." },
              { t: "Honest catalogue", b: "One source of truth — no marketing fiction on specs." },
            ].map((item) => (
              <div key={item.t} className="lh-card p-5">
                <h3 className="text-[14px] font-semibold text-ink">{item.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
