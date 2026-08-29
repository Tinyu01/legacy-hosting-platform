import Link from "next/link";
import {
  formatZAR,
  getActiveDomainProducts,
  getActiveVpsProducts,
  getActiveWebHostingProducts,
} from "../lib/catalog";
import { VpsPlanCard } from "../components/VpsPlanCard";
import { HostingPlanCard } from "../components/HostingPlanCard";

export default function HomePage() {
  const domains = getActiveDomainProducts();
  const vpsPlans = getActiveVpsProducts();
  const hosting = getActiveWebHostingProducts();
  const coza = domains.find((d) => d.slug === "co-za") ?? domains[0];
  const cheapestVps = vpsPlans[0];
  const cheapestHost = hosting[0];

  const productLines = [
    {
      icon: "🌐",
      title: "Domains",
      body: ".co.za, .com and more with DNS management included.",
      from: coza?.pricing.registration
        ? formatZAR(coza.pricing.registration)
        : "R149",
      unit: "/yr",
      href: "/domains",
    },
    {
      icon: "💾",
      title: "Web Hosting",
      body: "NVMe-backed shared hosting with SSL and backups.",
      from: cheapestHost?.pricing.monthly
        ? formatZAR(cheapestHost.pricing.monthly)
        : "R79",
      unit: "/mo",
      href: "/web-hosting",
    },
    {
      icon: "☁️",
      title: "Cloud VPS",
      body: "Full root access, billed monthly in ZAR.",
      from: cheapestVps?.pricing.monthly
        ? formatZAR(cheapestVps.pricing.monthly)
        : "R199",
      unit: "/mo",
      href: "/cloud-vps",
    },
    {
      icon: "🛡️",
      title: "Managed VPS",
      body: "We patch, monitor and secure your server.",
      from: "R599",
      unit: "/mo",
      href: "/cloud-vps",
    },
  ];

  return (
    <main>
      {/* ===== CINEMATIC HERO (Tech-style) ===== */}
      <section className="relative flex min-h-[92vh] w-full flex-col overflow-hidden bg-black">
        {/* Grid + glows */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,210,209,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(20,210,209,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-highlight/15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[600px] rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur">
            <span aria-hidden>☁️</span>
            Cloud Infrastructure
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Cloud &{" "}
            <span className="bg-gradient-to-r from-highlight via-accent to-highlight bg-clip-text text-transparent">
              Hosting
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl">
            Domains, web hosting and cloud VPS — priced in rand, supported in
            SAST, built for South African businesses.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/cloud-vps"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-highlight to-accent px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 active:scale-95 md:text-base"
            >
              Explore Solutions
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/cloud-vps"
              className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 md:text-base"
            >
              View Pricing
            </Link>
          </div>

          {/* Domain search */}
          <form
            action="/domains"
            className="mx-auto mt-10 flex w-full max-w-xl items-center gap-2 rounded-xl border border-white/15 bg-white/5 py-1.5 pl-4 pr-1.5 backdrop-blur"
          >
            <input
              type="text"
              name="q"
              placeholder="Search domain, e.g. yourbusiness.co.za"
              className="h-11 flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-lg bg-gradient-to-r from-highlight to-accent px-5 text-sm font-semibold text-white"
            >
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {domains.slice(0, 5).map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs text-white/80"
              >
                <span>{d.tld ?? d.name}</span>
                {d.pricing.registration != null && (
                  <span className="font-semibold text-highlight">
                    {formatZAR(d.pricing.registration)}/yr
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { n: "500+", l: "Businesses" },
              { n: "99.9%", l: "Uptime SLA" },
              { n: "~60s", l: "Deploy time" },
              { n: "24/7", l: "Portal access" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur"
              >
                <div className="text-2xl font-bold text-white tabular-nums">
                  {s.n}
                </div>
                <div className="mt-1 text-xs text-white/50">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT LINES (Tech service cards) ===== */}
      <section className="bg-gradient-to-b from-primary via-primary/95 to-soft py-20 md:py-28">
        <div className="lh-container">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              What we host
            </span>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Everything your business{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                runs on
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              One dashboard, one invoice, one support team — domains, hosting
              and cloud in rand.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {productLines.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-soft via-surface to-surface p-8 shadow-lg transition-all duration-300 hover:border-highlight/50 hover:shadow-2xl hover:shadow-highlight/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-highlight/10 to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-highlight/30 bg-gradient-to-br from-highlight/20 to-accent/20 text-3xl transition group-hover:border-highlight/60">
                    {c.icon}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white transition group-hover:text-highlight">
                    {c.title}
                  </h3>
                  <p className="mb-6 line-clamp-2 text-sm text-gray-400">
                    {c.body}
                  </p>
                  <p className="text-sm text-gray-300">
                    From{" "}
                    <span className="text-lg font-bold text-highlight">
                      {c.from}
                    </span>
                    {c.unit}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOUD VPS ===== */}
      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="lh-container">
          <div className="mb-12 max-w-2xl">
            <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              Cloud VPS
            </span>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Servers that{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                scale with you
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              Solid infrastructure, simple ZAR billing, no surprise renewal
              hikes.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {vpsPlans.map((plan) => (
              <VpsPlanCard key={plan.id} plan={plan} compact />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WEB HOSTING ===== */}
      <section className="border-t border-white/5 bg-gradient-to-b from-soft/20 to-transparent py-20 md:py-28">
        <div className="lh-container">
          <div className="mb-12 max-w-2xl">
            <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              Web hosting
            </span>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Shared hosting,{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                properly specified
              </span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {hosting.map((plan) => (
              <HostingPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="lh-container">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              How it works
            </span>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Live in minutes,{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                not tickets
              </span>
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "1",
                t: "Choose",
                b: "Pick a domain, hosting plan, or VPS tier.",
              },
              {
                n: "2",
                t: "Configure",
                b: "Location, OS and add-ons with a live total.",
              },
              {
                n: "3",
                t: "Checkout",
                b: "Pay in rand — VAT shown upfront.",
              },
              {
                n: "4",
                t: "Manage",
                b: "One portal for domains, hosting and servers.",
              },
            ].map((s) => (
              <div key={s.n} className="relative pt-4">
                <div className="absolute -top-2 left-0 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-highlight to-accent text-xl font-bold text-[#04132a] shadow-lg">
                  {s.n}
                </div>
                <div className="rounded-2xl border border-white/10 bg-surface/60 pt-12 p-6">
                  <h3 className="text-xl font-bold text-white">{s.t}</h3>
                  <p className="mt-2 text-sm text-gray-400">{s.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="lh-container">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-soft via-surface to-primary px-8 py-16 text-center md:px-16">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                Infrastructure?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-gray-300">
              Domain, hosting or VPS — clear ZAR pricing, one account.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/domains"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-highlight to-accent px-8 py-3.5 text-base font-semibold text-white transition hover:scale-105"
              >
                Get started
              </Link>
              <Link
                href="/cloud-vps"
                className="rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Browse Cloud VPS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
