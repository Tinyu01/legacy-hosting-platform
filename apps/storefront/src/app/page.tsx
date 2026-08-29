import Link from "next/link";
import {
  formatZAR,
  getActiveDomainProducts,
  getActiveVpsProducts,
  getActiveWebHostingProducts,
} from "../lib/catalog";

export default function HomePage() {
  const domains = getActiveDomainProducts().slice(0, 4);
  const vpsPlans = getActiveVpsProducts().slice(0, 4);
  const hosting = getActiveWebHostingProducts().slice(0, 3);
  const coza = domains.find((d) => d.slug === "co-za") ?? domains[0];

  return (
    <main>
      {/* Hero — Maleng Tech style */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-highlight/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="lh-section-label">Legacy Hosting · South Africa</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Domains, hosting & cloud VPS{" "}
                <span className="text-highlight">built to convert</span>
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

            {/* Metrics panel */}
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

      {/* Service pillars with icons */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="lh-section-label">Services</p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Infrastructure products
              </h2>
              <p className="mt-1 max-w-lg text-[14px] text-gray-400">
                Decoupled catalogue-driven products — clear specs, honest pricing,
                one checkout path.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Domains",
                body: "Search, register, transfer. DNS included.",
                href: "/domains",
                emoji: "🌐",
              },
              {
                title: "Web Hosting",
                body: "NVMe, SSL, email, Managed WordPress.",
                href: "/web-hosting",
                emoji: "🖥️",
              },
              {
                title: "Cloud VPS",
                body: "Root access, snapshots, firewall, metrics.",
                href: "/cloud-vps",
                emoji: "☁️",
              },
              {
                title: "Managed",
                body: "Optional ops layer on any cloud server.",
                href: "/cloud-vps",
                emoji: "🛡️",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="lh-card group p-5 transition hover:border-highlight/40"
              >
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="mt-3 text-[15px] font-semibold text-white group-hover:text-highlight">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-400">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contabo-style VPS cards */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="lh-section-label">Cloud VPS</p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Affordable, fast, and flexible
              </h2>
              <p className="mt-1 max-w-xl text-[14px] text-gray-400">
                Scalable cloud VPS designed and priced for everyone — from
                starters to ops teams. Full control over setup and administration.
              </p>
            </div>
            <Link
              href="/cloud-vps"
              className="text-[13px] font-semibold text-highlight hover:text-highlight/80"
            >
              All plans →
            </Link>
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
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-gray-500">
                    Linux Cloud
                  </p>

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
        </div>
      </section>

      {/* Web hosting */}
      <section className="border-b border-white/10 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="lh-section-label">Web Hosting</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Shared & Managed</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {hosting.map((plan) => (
              <div key={plan.id} className="lh-card p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-[15px] font-semibold text-white">{plan.name}</h3>
                  {plan.marketing?.badge && (
                    <span className="rounded bg-highlight/15 px-1.5 py-0.5 text-[10px] font-bold text-highlight">
                      {plan.marketing.badge}
                    </span>
                  )}
                </div>
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

      {/* Trust */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-white">
            Why operators choose Legacy Hosting
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "ZAR billing",
                b: "PayFast, Ozow and EFT. VAT-inclusive where applicable.",
              },
              {
                t: "Local support",
                b: "South African context — clear escalation, business hours.",
              },
              {
                t: "One platform",
                b: "Domains, hosting and VPS under a single account.",
              },
              {
                t: "Fast deploy",
                b: "Cloud VPS with root, snapshots and firewall from day one.",
              },
              {
                t: "Managed option",
                b: "Self-manage or add Managed Service for patching.",
              },
              {
                t: "Honest catalogue",
                b: "One source of truth — no marketing fiction on specs.",
              },
            ].map((item) => (
              <div key={item.t}>
                <h3 className="text-[14px] font-semibold text-white">{item.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-400">
                  {item.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">
            Start with a domain or a server
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-gray-400">
            Same account for everything that follows. Upgrade when you need to.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/domains" className="lh-btn-primary">
              Register a domain
            </Link>
            <Link href="/cloud-vps" className="lh-btn-secondary">
              Deploy Cloud VPS
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
