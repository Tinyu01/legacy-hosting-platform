import Link from "next/link";
import {
  formatZAR,
  getActiveDomainProducts,
  getActiveVpsProducts,
  getActiveWebHostingProducts,
} from "../lib/catalog";

export default function HomePage() {
  const domains = getActiveDomainProducts().slice(0, 3);
  const vpsPlans = getActiveVpsProducts().slice(0, 3);
  const hosting = getActiveWebHostingProducts().slice(0, 3);
  const coza = domains.find((d) => d.slug === "co-za") ?? domains[0];

  return (
    <main>
      {/* Thin trust strip */}
      <div className="border-b border-[#1c2129] bg-[#11141a]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-5 py-2 text-[11px] text-[#5c6573] sm:px-6 lg:px-8">
          <span>ZAR · VAT inclusive</span>
          <span className="hidden sm:inline">·</span>
          <span>South African support</span>
          <span className="hidden sm:inline">·</span>
          <span>PayFast · Ozow · EFT</span>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-[#1c2129]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-[2.25rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl">
              Infrastructure for businesses that ship
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-[#8b93a1]">
              Domains, web hosting and cloud servers — one account, clear ZAR
              pricing, local support. No supplier branding. No noise.
            </p>

            <form
              action="/domains"
              className="mx-auto mt-10 flex max-w-lg flex-col gap-2 sm:flex-row"
            >
              <input
                type="text"
                name="q"
                placeholder="yourbusiness.co.za"
                className="lh-input flex-1"
              />
              <button type="submit" className="lh-btn-primary whitespace-nowrap">
                Search domain
              </button>
            </form>
            <p className="mt-3 text-[12px] text-[#5c6573]">
              .co.za from{" "}
              {coza?.pricing.registration
                ? formatZAR(coza.pricing.registration)
                : "R149"}{" "}
              / year including DNS
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/cloud-vps" className="lh-btn-primary">
                Cloud VPS plans
              </Link>
              <Link href="/web-hosting" className="lh-btn-secondary">
                Web hosting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-[#1c2129]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-lg border border-[#2a303c] bg-[#2a303c] sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Domains",
                body: "Register and transfer with DNS management included.",
                href: "/domains",
              },
              {
                title: "Web Hosting",
                body: "NVMe storage, SSL, email and daily backups.",
                href: "/web-hosting",
              },
              {
                title: "Cloud VPS",
                body: "Root access, snapshots, firewall and metrics.",
                href: "/cloud-vps",
              },
              {
                title: "Managed",
                body: "Optional managed service on any cloud server.",
                href: "/cloud-vps",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-[#11141a] p-6 transition hover:bg-[#161b22]"
              >
                <h2 className="text-[14px] font-semibold text-white group-hover:text-blue-400">
                  {item.title}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#8b93a1]">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VPS pricing table style */}
      <section className="border-b border-[#1c2129]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="lh-section-label">Cloud VPS</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Virtual servers
              </h2>
              <p className="mt-1 max-w-md text-[13px] text-[#8b93a1]">
                Deploy in minutes. Billed monthly or annually in ZAR.
              </p>
            </div>
            <Link
              href="/cloud-vps"
              className="text-[13px] font-medium text-blue-400 hover:text-blue-300"
            >
              All plans →
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#2a303c]">
            <table className="w-full text-left text-[13px]">
              <thead className="border-b border-[#2a303c] bg-[#11141a] text-[11px] uppercase tracking-wider text-[#5c6573]">
                <tr>
                  <th className="px-5 py-3 font-medium">Plan</th>
                  <th className="hidden px-5 py-3 font-medium sm:table-cell">
                    Specs
                  </th>
                  <th className="px-5 py-3 font-medium">Monthly</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c2129]">
                {vpsPlans.map((plan) => {
                  const res = plan.resources as {
                    vcpu?: number;
                    ramGB?: number;
                    storage?: { sizeGB: number; type: string };
                  } | undefined;
                  return (
                    <tr
                      key={plan.id}
                      className="bg-[#0a0c10] transition hover:bg-[#11141a]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">
                            {plan.name}
                          </span>
                          {plan.marketing?.badge && (
                            <span className="rounded bg-blue-600/15 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400">
                              {plan.marketing.badge}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="hidden px-5 py-4 text-[#8b93a1] sm:table-cell">
                        {res?.vcpu ?? "—"} vCPU ·{" "}
                        {res?.ramGB ? `${res.ramGB} GB` : "—"} ·{" "}
                        {res?.storage
                          ? `${res.storage.sizeGB} GB ${res.storage.type}`
                          : "—"}
                      </td>
                      <td className="px-5 py-4 font-medium text-white">
                        {plan.pricing.monthly
                          ? formatZAR(plan.pricing.monthly)
                          : "—"}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/cloud-vps/${plan.slug}`}
                          className="text-[12px] font-semibold text-blue-400 hover:text-blue-300"
                        >
                          Configure
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hosting cards — restrained */}
      <section className="border-b border-[#1c2129] bg-[#11141a]/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="lh-section-label">Web Hosting</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Shared hosting
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {hosting.map((plan) => (
              <div key={plan.id} className="lh-card p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-white">
                    {plan.name}
                  </h3>
                  {plan.marketing?.badge && (
                    <span className="shrink-0 rounded bg-blue-600/15 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400">
                      {plan.marketing.badge}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {plan.pricing.monthly
                    ? formatZAR(plan.pricing.monthly)
                    : "—"}
                  <span className="text-[13px] font-normal text-[#8b93a1]">
                    /mo
                  </span>
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-[#8b93a1] line-clamp-2">
                  {plan.description}
                </p>
                <Link
                  href="/web-hosting"
                  className="mt-6 inline-block text-[13px] font-semibold text-blue-400 hover:text-blue-300"
                >
                  Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust grid */}
      <section className="border-b border-[#1c2129]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-semibold tracking-tight text-white">
            Built for operators, not demos
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "ZAR billing",
                b: "PayFast, Ozow and EFT. VAT-inclusive where applicable. Forecastable costs.",
              },
              {
                t: "Local support",
                b: "South African context — business hours, infrastructure realities, clear escalation.",
              },
              {
                t: "One platform",
                b: "Domains, hosting and VPS under a single account and invoice.",
              },
              {
                t: "Fast deploy",
                b: "Cloud VPS with root access, snapshots, firewall and metrics from day one.",
              },
              {
                t: "Managed option",
                b: "Stay self-managed or add Managed Service for patching and monitoring.",
              },
              {
                t: "Honest catalogue",
                b: "Specs and prices come from one source of truth — no marketing fiction.",
              },
            ].map((item) => (
              <div key={item.t}>
                <h3 className="text-[14px] font-semibold text-white">{item.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#8b93a1]">
                  {item.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Start with a domain or a server
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-[#8b93a1]">
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
