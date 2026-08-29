import Link from "next/link";
import { formatZAR, getActiveVpsProducts } from "../../lib/catalog";
import { PageHeader } from "../../components/PageHeader";
import { FinalCTA } from "../../components/FinalCTA";

export const metadata = {
  title: "Cloud VPS",
  description:
    "Scalable cloud VPS with NVMe storage, root access and ZAR billing.",
};

export default function CloudVpsPage() {
  const plans = getActiveVpsProducts();

  return (
    <main>
      <PageHeader
        badge="CLOUD VPS"
        title="Cloud servers"
        highlight="priced for operators"
        description="Scalable virtual servers with root access, NVMe storage and snapshots. Configure location, OS and add-ons — billed in ZAR."
        breadcrumb={[{ label: "Cloud VPS" }]}
        cta={{ text: "Compare plans", href: "#plans" }}
        ctaSecondary={{ text: "Search domain", href: "/domains" }}
      />

      <section id="plans" className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white">Choose your plan</h2>
          <p className="mt-2 text-[14px] text-gray-400">
            Clear specs. No supplier branding. Get Started opens configure.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => {
            const res = plan.resources as {
              vcpu?: number;
              ramGB?: number;
              storage?: { sizeGB: number; type: string };
              traffic?: { includedTB: number };
              ipv4?: number;
            } | undefined;
            const featured = Boolean(plan.marketing?.featured);

            return (
              <article
                key={plan.id}
                className={`relative flex flex-col overflow-hidden p-6 transition ${
                  featured ? "lh-card-featured" : "lh-card hover:border-highlight/30"
                }`}
              >
                {featured && (
                  <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-highlight via-accent to-highlight" />
                )}

                <div className="mb-1 flex items-start justify-between gap-2">
                  <h2 className="text-lg font-bold text-white">{plan.name}</h2>
                  {plan.marketing?.badge && (
                    <span className="shrink-0 rounded-full border border-highlight/40 bg-highlight/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-highlight">
                      {plan.marketing.badge}
                    </span>
                  )}
                </div>
                <p className="text-[12px] font-medium uppercase tracking-wider text-gray-500">
                  Linux Cloud
                </p>

                <div className="mt-6 rounded-xl border border-highlight/20 bg-highlight/10 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    From
                  </p>
                  <p className="mt-1 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight text-highlight">
                      {plan.pricing.monthly
                        ? formatZAR(plan.pricing.monthly)
                        : "—"}
                    </span>
                    <span className="text-sm text-gray-400">/ month</span>
                  </p>
                  {plan.pricing.annual && (
                    <p className="mt-1 text-[12px] text-gray-500">
                      or {formatZAR(plan.pricing.annual)} / year
                    </p>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-2.5 text-[13px] text-gray-300">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">vCPU</span>
                    <span className="font-semibold text-white">
                      {res?.vcpu ?? "—"} cores
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">RAM</span>
                    <span className="font-semibold text-white">
                      {res?.ramGB ? `${res.ramGB} GB` : "—"}
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Storage</span>
                    <span className="font-semibold text-white">
                      {res?.storage
                        ? `${res.storage.sizeGB} GB ${res.storage.type}`
                        : "—"}
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Traffic</span>
                    <span className="font-semibold text-white">
                      {res?.traffic ? `${res.traffic.includedTB} TB` : "—"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">IPv4</span>
                    <span className="font-semibold text-white">{res?.ipv4 ?? 1}</span>
                  </li>
                </ul>

                <Link
                  href={`/cloud-vps/${plan.slug}`}
                  className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition ${
                    featured
                      ? "bg-highlight text-primary hover:bg-highlight/90"
                      : "border border-white/15 bg-white/5 text-white hover:border-highlight/40 hover:text-highlight"
                  }`}
                >
                  Get Started
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
