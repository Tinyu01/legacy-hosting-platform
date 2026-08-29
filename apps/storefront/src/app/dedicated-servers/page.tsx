import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";
import { FinalCTA } from "../../components/FinalCTA";

export const metadata = {
  title: "Dedicated Servers",
  description:
    "Single-tenant bare metal for demanding workloads. Coming soon on Legacy Hosting.",
};

const tiers = [
  {
    name: "Dedicated Entry",
    cpu: "8 cores",
    ram: "32 GB",
    storage: "2 × 512 GB NVMe",
    note: "App servers & databases",
  },
  {
    name: "Dedicated Pro",
    cpu: "16 cores",
    ram: "64 GB",
    storage: "2 × 1 TB NVMe",
    note: "Production clusters",
  },
  {
    name: "Dedicated Scale",
    cpu: "32+ cores",
    ram: "128 GB+",
    storage: "Custom",
    note: "High I/O & compliance",
  },
];

export default function DedicatedServersPage() {
  return (
    <main>
      <PageHeader
        badge="Dedicated Servers"
        title="Bare metal"
        highlight="when shared is not enough"
        description="Single-tenant servers with full hardware control. Catalogue status: draft — sellable plans land after Cloud VPS checkout is solid."
        breadcrumb={[{ label: "Dedicated Servers" }]}
        cta={{ text: "Talk to us", href: "https://tech.malenglegacy.co.za" }}
        ctaSecondary={{ text: "Cloud VPS now", href: "/cloud-vps" }}
      />

      <section className="py-14 md:py-20">
        <div className="lh-container">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              Roadmap
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Planned{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                tiers
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Illustrative shapes only. Final specs and ZAR pricing will come from{" "}
              <code className="text-highlight">hosting-catalog.json</code> when
              dedicated moves to active.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-surface/50 p-7"
              >
                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{t.note}</p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <dt className="text-white/40">CPU</dt>
                    <dd className="font-medium text-white">{t.cpu}</dd>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <dt className="text-white/40">RAM</dt>
                    <dd className="font-medium text-white">{t.ram}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/40">Storage</dt>
                    <dd className="font-medium text-white">{t.storage}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-highlight/20 bg-highlight/5 p-8 text-center">
            <h3 className="text-xl font-bold text-white">Need metal today?</h3>
            <p className="mx-auto mt-2 max-w-lg text-gray-400">
              Start on Cloud VPS for production workloads, or contact Maleng
              Legacy Tech for a custom dedicated quote.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/cloud-vps"
                className="rounded-lg bg-gradient-to-r from-highlight to-accent px-5 py-2.5 text-sm font-semibold text-white"
              >
                Browse Cloud VPS
              </Link>
              <a
                href="https://tech.malenglegacy.co.za"
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Request quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
