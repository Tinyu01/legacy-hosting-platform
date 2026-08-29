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

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-border px-5 pb-16 pt-16 text-center sm:px-6 sm:pt-20 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-highlight/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-[10%] h-[400px] w-[700px] rounded-full bg-accent/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-soft px-4 py-1.5 text-[12.5px] text-ink-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Trusted by South African businesses
          </div>

          <h1 className="mx-auto max-w-[700px] text-[2rem] font-semibold leading-[1.18] tracking-tight text-ink sm:text-[2.75rem] lg:text-[46px]">
            Infrastructure that{" "}
            <span className="gradient-text">just works</span>, priced in rand
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[17px] text-ink-muted">
            Domains, web hosting, and cloud VPS on one platform. No hidden fees,
            no foreign billing surprises, no waiting on a ticket queue in a
            different time zone.
          </p>

          <form
            action="/domains"
            className="mx-auto mt-9 flex max-w-[600px] items-center gap-2 rounded-[13px] border border-border-strong bg-soft py-1.5 pl-5 pr-1.5"
          >
            <svg
              className="h-5 w-5 shrink-0 text-ink-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              name="q"
              placeholder="find your domain, e.g. yourbusiness.co.za"
              className="h-[42px] flex-1 border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-dim"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-[9px] bg-highlight px-6 text-[14px] font-semibold text-[#04241f] transition hover:brightness-105"
            >
              Search domain
            </button>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {domains.slice(0, 5).map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-[13px]"
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

          <div className="mt-14 flex flex-wrap justify-center gap-8 sm:gap-11">
            {[
              { n: "500+", l: "Businesses hosted" },
              { n: "99.9%", l: "Uptime SLA" },
              { n: "~60s", l: "Avg. deploy time" },
              { n: "24/7", l: "Portal access" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-[26px] font-semibold text-ink">{s.n}</div>
                <div className="mt-1 text-[12.5px] text-ink-dim">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROMO ===== */}
      <div className="border-y border-border bg-surface py-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-3 rounded-[11px] border border-accent/30 bg-soft px-6 py-3.5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 text-[14px] text-ink-secondary">
              <span className="text-accent">✦</span>
              Annual Cloud VPS plans — clear ZAR pricing, no foreign FX surprises
            </div>
            <Link
              href="/cloud-vps"
              className="flex items-center gap-1 text-[13px] font-semibold text-highlight"
            >
              View VPS plans →
            </Link>
          </div>
        </div>
      </div>

      {/* ===== TRUST BAR ===== */}
      <div className="border-b border-border bg-surface py-7">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 sm:px-6 lg:px-8">
          <span className="whitespace-nowrap text-[12px] text-ink-dim">
            Built on infrastructure trusted by
          </span>
          <div className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-ink-muted sm:gap-8">
            {["cPanel", "Cloudflare", "Let's Encrypt", "ISO 27001 DCs", "Live status ↗"].map(
              (t) => (
                <span key={t}>{t}</span>
              )
            )}
          </div>
        </div>
      </div>

      {/* ===== PRODUCT LINES ===== */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-accent">
              What we host
            </p>
            <h2 className="text-[32px] font-semibold tracking-tight text-ink">
              Everything your business runs on
            </h2>
            <p className="mt-3 text-[15.5px] text-ink-muted">
              One dashboard, one invoice, one support team — instead of juggling
              a registrar, a host, and a cloud provider that don't talk to
              each other.
            </p>
          </div>

          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Domains",
                body: ".co.za, .com and more with DNS management included.",
                from: coza?.pricing.registration
                  ? formatZAR(coza.pricing.registration)
                  : "R149",
                unit: "/yr",
                href: "/domains",
              },
              {
                title: "Web Hosting",
                body: "NVMe-backed shared hosting with SSL and backups.",
                from: cheapestHost?.pricing.monthly
                  ? formatZAR(cheapestHost.pricing.monthly)
                  : "R79",
                unit: "/mo",
                href: "/web-hosting",
              },
              {
                title: "Cloud VPS",
                body: "Full root access, billed monthly in ZAR.",
                from: cheapestVps?.pricing.monthly
                  ? formatZAR(cheapestVps.pricing.monthly)
                  : "R199",
                unit: "/mo",
                href: "/cloud-vps",
              },
              {
                title: "Managed VPS",
                body: "We patch, monitor and secure your server.",
                from: "R599",
                unit: "/mo",
                href: "/cloud-vps",
              },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="rounded-[14px] border border-border bg-soft p-[22px] transition hover:-translate-y-0.5 hover:border-highlight"
              >
                <h3 className="mt-1 text-[16px] font-semibold text-ink">{c.title}</h3>
                <p className="mt-1.5 mb-3.5 text-[13px] text-ink-muted">{c.body}</p>
                <p className="text-[13px] text-ink-secondary">
                  From <b className="text-[16px] text-ink">{c.from}</b>
                  {c.unit}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="border-b border-border bg-surface py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-accent">
              Who we are
            </p>
            <h2 className="text-[30px] font-semibold tracking-tight text-ink">
              Part of Maleng Legacy Group, built for the long run
            </h2>
            <p className="mt-4 text-[14.5px] leading-[1.7] text-ink-muted">
              Legacy Hosting is the infrastructure arm of Maleng Legacy Group,
              alongside our sister company Maleng Legacy Tech, which builds
              software and runs cybersecurity consulting for businesses across
              South Africa.
            </p>
            <p className="mt-3.5 text-[14.5px] leading-[1.7] text-ink-muted">
              We started Legacy Hosting because our consulting clients kept
              hitting the same wall: excellent global infrastructure, but
              billing in foreign currency, support in the wrong time zone, and
              no one local to call when something broke.
            </p>
            <a
              href="https://tech.malenglegacy.co.za"
              className="lh-btn-secondary mt-5 inline-flex"
            >
              Visit Maleng Legacy Tech →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            {[
              { n: "2026", l: "Platform year" },
              { n: "3", l: "Regions (ZA + EU)" },
              { n: "100%", l: "South African owned" },
              { n: "ZAR", l: "Billing currency" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-border bg-soft p-5"
              >
                <div className="text-2xl font-semibold text-highlight">{s.n}</div>
                <div className="mt-1 text-[12.5px] text-ink-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECS ===== */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-accent">
              Under the hood
            </p>
            <h2 className="text-[32px] font-semibold tracking-tight text-ink">
              Enterprise hardware, no marketing fog
            </h2>
            <p className="mt-3 text-[15.5px] text-ink-muted">
              Every plan runs on the same tier of infrastructure — we don't
              downgrade hardware to hit a lower price point.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                t: "Processor",
                b: "Modern multi-core vCPU allocation for consistent performance under load.",
              },
              {
                t: "Memory",
                b: "ECC-class RAM across nodes for data integrity under sustained load.",
              },
              {
                t: "Storage",
                b: "NVMe SSD storage with optional automated off-site backups.",
              },
              {
                t: "Network",
                b: "Private networking options, IPv4 and IPv6 where available.",
              },
              {
                t: "Protection",
                b: "Network-layer protections and firewall options on Cloud VPS.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-[14px] border border-border bg-surface p-5"
              >
                <h4 className="text-[13.5px] font-semibold text-ink">{c.t}</h4>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOUD VPS ===== */}
      <section className="border-b border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-[560px]">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-accent">
              Cloud VPS
            </p>
            <h2 className="text-[32px] font-semibold tracking-tight text-ink">
              Servers that scale with you
            </h2>
            <p className="mt-3 text-[15.5px] text-ink-muted">
              Deployed on solid infrastructure, billed simply in ZAR, with no
              surprise renewal hikes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {vpsPlans.map((plan) => (
              <VpsPlanCard key={plan.id} plan={plan} compact />
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-11 overflow-x-auto rounded-[14px] border border-border bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-center text-[13px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-4 text-left font-normal text-ink-muted">
                    Specification
                  </th>
                  {vpsPlans.map((p) => (
                    <th
                      key={p.id}
                      className={`px-4 py-4 font-semibold ${
                        p.marketing?.featured ? "text-highlight" : "text-ink"
                      }`}
                    >
                      {p.name.replace("Legacy ", "")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-ink-secondary">
                {[
                  {
                    label: "vCPU cores",
                    get: (r: { vcpu?: number }) => r.vcpu ?? "—",
                  },
                  {
                    label: "RAM",
                    get: (r: { ramGB?: number }) =>
                      r.ramGB != null ? `${r.ramGB} GB` : "—",
                  },
                  {
                    label: "NVMe storage",
                    get: (r: { storage?: { sizeGB: number } }) =>
                      r.storage ? `${r.storage.sizeGB} GB` : "—",
                  },
                  {
                    label: "Bandwidth",
                    get: (r: { traffic?: { includedTB: number } }) =>
                      r.traffic ? `${r.traffic.includedTB} TB` : "—",
                  },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border">
                    <td className="px-4 py-3.5 text-left text-ink-muted">
                      {row.label}
                    </td>
                    {vpsPlans.map((p) => (
                      <td key={p.id} className="px-4 py-3.5">
                        {row.get((p.resources ?? {}) as never)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-3.5 text-left text-ink-muted">Price</td>
                  {vpsPlans.map((p) => (
                    <td key={p.id} className="px-4 py-3.5 font-medium text-ink">
                      {p.pricing.monthly
                        ? `${formatZAR(p.pricing.monthly)}/mo`
                        : "—"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== WEB HOSTING ===== */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-[560px]">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-accent">
              Web hosting
            </p>
            <h2 className="text-[32px] font-semibold tracking-tight text-ink">
              Shared hosting, properly specified
            </h2>
            <p className="mt-3 text-[15.5px] text-ink-muted">
              Every plan includes SSL and NVMe storage — the difference is how
              much room you have to grow.
            </p>
          </div>
          <div className="grid gap-[18px] md:grid-cols-3">
            {hosting.map((plan) => (
              <HostingPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US COMPARISON ===== */}
      <section className="border-b border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-accent">
              Why Legacy Hosting
            </p>
            <h2 className="text-[32px] font-semibold tracking-tight text-ink">
              Built for South Africa, not adapted for it
            </h2>
            <p className="mt-3 text-[15.5px] text-ink-muted">
              Global budget hosts are cheap until you need support at 2am or your
              invoice arrives in a currency that isn't yours.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[14px] border border-border bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-center text-[13.5px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-[18px] py-5 text-left font-semibold text-ink-muted" />
                  <th className="px-[18px] py-5 font-bold text-highlight">
                    Legacy Hosting
                  </th>
                  <th className="px-[18px] py-5 font-semibold text-ink-muted">
                    Global budget host
                  </th>
                  <th className="px-[18px] py-5 font-semibold text-ink-muted">
                    Big cloud (AWS/GCP)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Billing currency", "ZAR", "USD / EUR", "USD"],
                  ["Local payment methods", "Yes", "Rarely", "Limited"],
                  ["Support time zone", "SAST", "CET / PST", "Follow-the-sun"],
                  ["Setup complexity", "One click", "One click", "Requires expertise"],
                  ["Renewal price hikes", "None", "Common", "Usage-based"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border last:border-0">
                    <td className="px-[18px] py-4 text-left text-ink-secondary">
                      {row[0]}
                    </td>
                    <td className="bg-highlight/5 px-[18px] py-4 font-medium text-ink">
                      {row[1]}
                    </td>
                    <td className="px-[18px] py-4 text-ink-dim">{row[2]}</td>
                    <td className="px-[18px] py-4 text-ink-dim">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-accent">
              How it works
            </p>
            <h2 className="text-[32px] font-semibold tracking-tight text-ink">
              Live in minutes, not tickets
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "1",
                t: "Choose",
                b: "Pick a domain, hosting plan, or VPS tier that matches what you're building.",
              },
              {
                n: "2",
                t: "Configure",
                b: "Select location, OS, and add-ons. See your total update live.",
              },
              {
                n: "3",
                t: "Checkout",
                b: "Pay by card, EFT, or Ozow. Everything billed in rand with VAT shown upfront.",
              },
              {
                n: "4",
                t: "Manage",
                b: "Manage domains, hosting and servers from one client portal.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="mb-4 flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-highlight text-[13px] font-bold text-highlight">
                  {s.n}
                </div>
                <h3 className="text-[15.5px] font-semibold text-ink">{s.t}</h3>
                <p className="mt-1.5 text-[13px] text-ink-muted">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="border-b border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-accent">
              Trusted by teams like yours
            </p>
            <h2 className="text-[32px] font-semibold tracking-tight text-ink">
              What our clients say
            </h2>
          </div>
          <div className="grid gap-[18px] md:grid-cols-3">
            {[
              {
                q: "We moved off a European host after one too many 3am outages with no one to call. Local context matters.",
                n: "Naledi M.",
                r: "Founder, retail e-commerce",
                a: "NM",
              },
              {
                q: "Billing in rand sounds small until you're explaining a surprise USD charge to finance every month.",
                n: "Thabo K.",
                r: "IT manager, logistics firm",
                a: "TK",
              },
              {
                q: "Spun up a VPS during a client demo. It was ready before I'd finished explaining what we were about to show.",
                n: "Riaan P.",
                r: "Freelance developer",
                a: "RP",
              },
            ].map((t) => (
              <div
                key={t.n}
                className="rounded-[14px] border border-border bg-soft p-6"
              >
                <p className="mb-3.5 text-[13px] text-accent">★★★★★</p>
                <p className="mb-[18px] text-[14px] leading-[1.65] text-ink-secondary">
                  &ldquo;{t.q}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-raised text-[13px] font-semibold text-highlight">
                    {t.a}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-ink">{t.n}</div>
                    <div className="text-[11.5px] text-ink-dim">{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-accent">
              FAQ
            </p>
            <h2 className="text-[32px] font-semibold tracking-tight text-ink">
              Questions we get asked
            </h2>
          </div>
          <div className="mx-auto max-w-[760px] divide-y divide-border border-y border-border">
            {[
              {
                q: "Where are your servers actually located?",
                a: "You can choose Johannesburg for the lowest latency to South African visitors, or Europe for EU-facing projects. Locations are shown by city/region — never as supplier codes.",
              },
              {
                q: "Do prices increase at renewal?",
                a: "Catalogue prices are the prices we sell at. Any change is deliberate and published — not a first-term discount trap.",
              },
              {
                q: "Can I move an existing website or server to you?",
                a: "Yes. Migration support is available as the platform expands. Start with a plan and open a ticket from the client portal.",
              },
              {
                q: "What payment methods do you accept?",
                a: "Card, EFT, PayFast and Ozow — processed in rand. Wired through FOSSBilling in the next phase.",
              },
              {
                q: "Is DDoS protection included?",
                a: "Network-layer protections and cloud firewall options are available on Cloud VPS. Details ship with each plan's feature list.",
              },
            ].map((f) => (
              <details key={f.q} className="group py-[22px]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-ink marker:content-none">
                  {f.q}
                  <span className="text-ink-muted transition group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 max-w-[640px] text-[13.5px] leading-[1.65] text-ink-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[20px] border border-border bg-gradient-to-br from-soft to-primary px-8 py-16 text-center sm:px-10">
          <h2 className="text-[30px] font-semibold text-ink">
            Ready to move your business to infrastructure that's actually
            yours?
          </h2>
          <p className="mx-auto mt-3.5 max-w-[440px] text-[15px] text-ink-muted">
            Set up a domain, hosting plan, or VPS — clear ZAR pricing, one
            account.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/domains" className="lh-btn-primary !px-7 !py-3.5 !text-[14.5px]">
              Get started
            </Link>
            <Link href="/cloud-vps" className="lh-btn-secondary !px-7 !py-3.5 !text-[14.5px]">
              Browse Cloud VPS
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
