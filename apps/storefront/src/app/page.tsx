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

  return (
    <main className="flex flex-col">
      {/* Trust bar */}
      <div className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-2.5 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ZAR billing · VAT inclusive
          </span>
          <span>South African support</span>
          <span>Instant VPS provisioning</span>
          <span>PayFast · Ozow · EFT</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
            Legacy Hosting
          </p>
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Infrastructure built for{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              your next move
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
            Domains, web hosting and cloud servers — one account, one invoice,
            local support. Built for South African businesses that need to ship
            without the complexity.
          </p>

          <form
            action="/domains"
            className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              name="q"
              placeholder="yourbusiness.co.za"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-white shadow-inner placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
            <button
              type="submit"
              className="rounded-xl bg-sky-500 px-8 py-3.5 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
            >
              Search domain
            </button>
          </form>
          <p className="mt-4 text-sm text-slate-500">
            .co.za from {domains[0]?.pricing.registration
              ? formatZAR(domains[0].pricing.registration)
              : "R149"}{" "}
            / year · Free DNS management
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/cloud-vps"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Deploy a VPS
            </Link>
            <Link
              href="/web-hosting"
              className="rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Web hosting plans
            </Link>
          </div>
        </div>
      </section>

      {/* Product pillars */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Everything you need to go live
            </h2>
            <p className="mt-2 text-slate-400">
              One platform. Clear pricing. No supplier jargon.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Domains",
                desc: "Register and transfer .co.za, .com and more with DNS included.",
                href: "/domains",
                cta: "View domains",
              },
              {
                title: "Web Hosting",
                desc: "Fast shared hosting with SSL, email and daily backups.",
                href: "/web-hosting",
                cta: "View plans",
              },
              {
                title: "Cloud VPS",
                desc: "NVMe servers with root access, snapshots and instant deploy.",
                href: "/cloud-vps",
                cta: "Configure VPS",
              },
              {
                title: "Managed",
                desc: "Add managed service to any VPS — we handle the stack.",
                href: "/cloud-vps",
                cta: "Learn more",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-sky-500/40 hover:bg-slate-900"
              >
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-sky-400">
                  {item.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">
                  {item.desc}
                </p>
                <span className="text-sm font-medium text-sky-400">
                  {item.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured VPS from catalogue */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 text-sm font-medium uppercase tracking-wider text-sky-400">
                Cloud VPS
              </p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Servers that scale with you
              </h2>
              <p className="mt-2 max-w-lg text-slate-400">
                Production-ready virtual servers. Deploy in minutes. Billed in
                Rand.
              </p>
            </div>
            <Link
              href="/cloud-vps"
              className="text-sm font-semibold text-sky-400 hover:text-sky-300"
            >
              Compare all plans →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {vpsPlans.map((plan) => {
              const res = plan.resources as {
                vcpu?: number;
                ramGB?: number;
                storage?: { sizeGB: number; type: string };
              } | undefined;
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-6 ${
                    plan.marketing?.featured
                      ? "border-sky-500/50 bg-slate-900 shadow-xl shadow-sky-500/5"
                      : "border-slate-800 bg-slate-900/30"
                  }`}
                >
                  {plan.marketing?.badge && (
                    <span className="absolute -top-3 left-6 rounded-full bg-sky-500 px-3 py-0.5 text-xs font-bold text-slate-950">
                      {plan.marketing.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {plan.marketing?.label ?? plan.description?.slice(0, 48)}
                  </p>
                  <p className="mt-4">
                    <span className="text-3xl font-bold text-white">
                      {plan.pricing.monthly
                        ? formatZAR(plan.pricing.monthly)
                        : "—"}
                    </span>
                    <span className="text-slate-400">/mo</span>
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-slate-300">
                    <li>{res?.vcpu ?? "—"} vCPU</li>
                    <li>{res?.ramGB ? `${res.ramGB} GB RAM` : "—"}</li>
                    <li>
                      {res?.storage
                        ? `${res.storage.sizeGB} GB ${res.storage.type}`
                        : "—"}
                    </li>
                  </ul>
                  <Link
                    href={`/cloud-vps/${plan.slug}`}
                    className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition ${
                      plan.marketing?.featured
                        ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
                        : "bg-slate-800 text-white hover:bg-slate-700"
                    }`}
                  >
                    Configure
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Web hosting strip */}
      <section className="border-b border-slate-800 bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-sky-400">
              Web Hosting
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Launch your site on solid ground
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {hosting.map((plan) => (
              <div
                key={plan.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  {plan.marketing?.badge && (
                    <span className="rounded bg-sky-500/15 px-2 py-0.5 text-xs font-medium text-sky-400">
                      {plan.marketing.badge}
                    </span>
                  )}
                </div>
                <p className="mt-4">
                  <span className="text-2xl font-bold text-white">
                    {plan.pricing.monthly
                      ? formatZAR(plan.pricing.monthly)
                      : "—"}
                  </span>
                  <span className="text-slate-400">/mo</span>
                </p>
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                  {plan.description}
                </p>
                <Link
                  href="/web-hosting"
                  className="mt-6 inline-block text-sm font-semibold text-sky-400 hover:text-sky-300"
                >
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why / trust */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-12 text-center text-2xl font-bold text-white sm:text-3xl">
            Why teams choose Legacy Hosting
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Priced and billed in ZAR",
                body: "No forex surprises. PayFast, Ozow and EFT. VAT-inclusive pricing you can forecast.",
              },
              {
                title: "South African support",
                body: "Talk to people who understand local business hours, load shedding planning and SA compliance context.",
              },
              {
                title: "One platform, one invoice",
                body: "Domains, hosting and VPS under a single account — not three suppliers and three portals.",
              },
              {
                title: "Instant cloud deployment",
                body: "Order a VPS and get root access in minutes. Snapshots, firewall and metrics included.",
              },
              {
                title: "Managed when you need it",
                body: "Stay self-managed or add Managed Service — patching, monitoring and priority support.",
              },
              {
                title: "Transparent catalogue",
                body: "What you see is what you pay. No hidden resource limits dressed up as marketing.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-800/80 p-5">
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to ship?
          </h2>
          <p className="mt-3 text-slate-400">
            Start with a domain or deploy a server. Upgrade paths are built in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/domains"
              className="rounded-xl bg-sky-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Register a domain
            </Link>
            <Link
              href="/cloud-vps"
              className="rounded-xl border border-slate-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Deploy Cloud VPS
            </Link>
          </div>
          <p className="mt-8 text-xs text-slate-500">
            Existing customer?{" "}
            <a
              href="https://cloud.malenglegacy.co.za"
              className="text-sky-400 hover:underline"
            >
              Open Client Portal
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
