import { formatZAR, getActiveVpsProducts } from "../../lib/catalog";

export const metadata = {
  title: "Cloud VPS",
  description:
    "Scalable virtual servers with NVMe storage, instant provisioning and ZAR billing.",
};

export default function CloudVpsPage() {
  const plans = getActiveVpsProducts();

  return (
    <main className="min-h-screen">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-sky-400">
            Cloud VPS
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Deploy your server in minutes
          </h1>
          <p className="mx-auto max-w-xl text-slate-400">
            High-performance virtual servers with NVMe storage, IPv4, snapshots
            and full root access. Billed in ZAR.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => {
            const resources = plan.resources as {
              vcpu?: number;
              ramGB?: number;
              storage?: { sizeGB: number; type: string };
              traffic?: { includedTB: number };
              ipv4?: number;
            } | undefined;
            const storage = resources?.storage;
            const traffic = resources?.traffic;

            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-6 transition ${
                  plan.marketing?.featured
                    ? "border-sky-500/60 bg-slate-900 shadow-lg shadow-sky-500/10"
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                {plan.marketing?.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-sky-500 px-3 py-0.5 text-xs font-semibold text-slate-950">
                    {plan.marketing.badge}
                  </span>
                )}

                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                  {plan.marketing?.label && (
                    <p className="text-sm text-slate-400">{plan.marketing.label}</p>
                  )}
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">
                    {plan.pricing.monthly ? formatZAR(plan.pricing.monthly) : "—"}
                  </span>
                  <span className="text-slate-400"> / month</span>
                  {plan.pricing.annual && (
                    <p className="mt-1 text-xs text-slate-500">
                      or {formatZAR(plan.pricing.annual)} / year
                    </p>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-2 text-sm text-slate-300">
                  <li className="flex justify-between">
                    <span>vCPU</span>
                    <span className="font-medium text-white">{resources?.vcpu ?? "—"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>RAM</span>
                    <span className="font-medium text-white">
                      {resources?.ramGB ? `${resources.ramGB} GB` : "—"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Storage</span>
                    <span className="font-medium text-white">
                      {storage ? `${storage.sizeGB} GB ${storage.type}` : "—"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Traffic</span>
                    <span className="font-medium text-white">
                      {traffic ? `${traffic.includedTB} TB` : "—"}
                    </span>
                  </li>
                </ul>

                <a
                  href={`/cloud-vps/${plan.slug}`}
                  className={`block rounded-lg py-3 text-center text-sm font-semibold transition ${
                    plan.marketing?.featured
                      ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  Configure
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
