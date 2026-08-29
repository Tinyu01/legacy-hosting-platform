import Link from "next/link";
import { formatZAR, getActiveVpsProducts } from "../../lib/catalog";

export const metadata = {
  title: "Cloud VPS",
  description:
    "Scalable cloud VPS with NVMe storage, root access and ZAR billing. Configure and deploy in minutes.",
};

export default function CloudVpsPage() {
  const plans = getActiveVpsProducts();

  return (
    <main>
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="lh-section-label">Cloud VPS</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Cloud VPS — fast, flexible, priced in ZAR
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            Scalable virtual servers for developers and businesses. Quick setup,
            consistent performance, full root access. Choose a plan and configure
            location, OS and add-ons.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
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
                  featured
                    ? "lh-card-featured"
                    : "lh-card hover:border-highlight/30"
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
                  {plan.marketing?.label ?? "Linux Cloud"}
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
                    <span className="font-semibold text-white">
                      {res?.ipv4 ?? 1}
                    </span>
                  </li>
                </ul>

                {(plan.features as string[] | undefined)?.length ? (
                  <ul className="mt-5 space-y-1.5 text-[12px] text-gray-400">
                    {(plan.features as string[]).slice(0, 4).map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-highlight">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                ) : null}

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

        <p className="mt-10 text-center text-[12px] text-gray-500">
          Snapshots, cloud firewall and metrics included. Managed Service and
          daily backups available at configure.
        </p>
      </section>
    </main>
  );
}
