import Link from "next/link";
import {
  formatZAR,
  getActiveDomainProducts,
  getActiveVpsProducts,
  getActiveWebHostingProducts,
} from "../lib/catalog";
import { HowItWorks } from "../components/HowItWorks";
import { FinalCTA } from "../components/FinalCTA";

export default function HomePage() {
  const domains = getActiveDomainProducts().slice(0, 4);
  const vpsPlans = getActiveVpsProducts().slice(0, 4);
  const hosting = getActiveWebHostingProducts().slice(0, 3);
  const coza = domains.find((d) => d.slug === "co-za") ?? domains[0];

  return (
    <main>
      {/* 1. HeroModern pattern */}
      <section className="relative overflow-hidden border-b border-white/10">
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
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Domains, hosting & cloud VPS{" "}
                <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                  built to convert
                </span>
              </h1>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-gray-400">
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

              <form
                action="/domains"
                className="mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
              >
                <input
                  type="text"
                  name="q"
                  placeholder="yourbusiness.co.za"
                  className="lh-input flex-1"
                />
                <button type="submit" className="lh-btn-primary whitespace-nowrap">
                  Search
                </button>
              </form>
              <p className="mt-2 text-[12px] text-gray-500">
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
                  <p className="mt-1 text-[12px] font-medium text-gray-400">{m.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core product lines (Tech: 6 Core Service Lines) */}
      <section className="border-b border-white/10 bg-gradient-to-b from-primary via-primary to-soft/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <span className="text-[12px] font-bold uppercase tracking-wider text-accent">
                Our products
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Core{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                product lines
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] text-gray-400">
              Each line is catalogue-driven — specialised products, clear pricing,
              one checkout path.
            </p>
          </div>

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
                <h3 className="text-xl font-bold text-white group-hover:text-highlight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-400">
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

      {/* 3. Featured VPS (Tech: Most Trusted Services) */}
      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <span className="text-[12px] font-bold uppercase tracking-wider text-accent">
                Featured
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Cloud VPS —{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                fast & flexible
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] text-gray-400">
              Scalable virtual servers with root access. Priced in ZAR.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {vpsPlans.map((plan) => {
              const res = plan.resources as {
                vcpu?: number;
                ramGB?: number;
                storage?: { sizeGB: number; type: string };
                traffic?: { includedTB: number };
              } | undefined;
              const featured = Boolean(plan.marketing?.featured);

              return (
                <article
                  key={plan.id}
                  className={`relative flex flex-col overflow-hidden p-5 ${
                    featured ? "lh-card-featured" : "lh-card"
                  }`}
                >
                  {featured && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-highlight via-accent to-highlight" />
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[15px] font-bold text-white">{plan.name}</h3>
                    {plan.marketing?.badge && (
                      <span className="rounded-full border border-highlight/30 bg-highlight/10 px-2 py-0.5 text-[10px] font-bold uppercase text-highlight">
                        {plan.marketing.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-highlight">
                        {plan.pricing.monthly
                          ? formatZAR(plan.pricing.monthly)
                          : "—"}
                      </span>
                      <span className="text-[12px] text-gray-500">/mo</span>
                    </p>
                  </div>
                  <ul className="mt-4 flex-1 space-y-2 text-[12px] text-gray-300">
                    <li className="flex justify-between">
                      <span className="text-gray-500">vCPU</span>
                      <span className="font-semibold">{res?.vcpu ?? "—"} cores</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">RAM</span>
                      <span className="font-semibold">
                        {res?.ramGB ? `${res.ramGB} GB` : "—"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Storage</span>
                      <span className="font-semibold">
                        {res?.storage
                          ? `${res.storage.sizeGB} GB ${res.storage.type}`
                          : "—"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Traffic</span>
                      <span className="font-semibold">
                        {res?.traffic ? `${res.traffic.includedTB} TB` : "—"}
                      </span>
                    </li>
                  </ul>
                  <Link
                    href={`/cloud-vps/${plan.slug}`}
                    className={`mt-5 block rounded-xl py-2.5 text-center text-[13px] font-semibold transition ${
                      featured
                        ? "bg-highlight text-primary hover:bg-highlight/90"
                        : "border border-white/15 bg-white/5 hover:border-highlight/40 hover:text-highlight"
                    }`}
                  >
                    Get Started
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/cloud-vps"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[13px] font-semibold text-white transition hover:border-highlight/50"
            >
              View all Cloud VPS →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Web hosting strip */}
      <section className="border-b border-white/10 bg-surface/50 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white">Web Hosting</h2>
            <p className="mt-2 text-[14px] text-gray-400">Shared & Managed WordPress</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {hosting.map((plan) => (
              <div key={plan.id} className="lh-card p-6">
                <h3 className="text-[15px] font-semibold text-white">{plan.name}</h3>
                <p className="mt-4 text-2xl font-bold text-highlight">
                  {plan.pricing.monthly ? formatZAR(plan.pricing.monthly) : "—"}
                  <span className="text-[13px] font-normal text-gray-500">/mo</span>
                </p>
                <p className="mt-2 line-clamp-2 text-[13px] text-gray-400">
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

      {/* 5. How it works (Tech pattern) */}
      <HowItWorks />

      {/* 6. Trust / highlights */}
      <section className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-white sm:text-2xl">
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
                <h3 className="text-[14px] font-semibold text-white">{item.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-400">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA (Tech pattern) */}
      <FinalCTA />
    </main>
  );
}
