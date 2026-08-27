import { notFound } from "next/navigation";
import { formatZAR } from "@legacy-hosting/catalog";
import { getCatalog } from "../../../lib/catalog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const catalog = getCatalog();
  const plan = catalog.products.find(
    (p) => p.slug === slug && p.category === "cloud-vps" && p.status === "active"
  );

  if (!plan) return { title: "VPS not found" };

  return {
    title: `Configure ${plan.name}`,
    description: plan.description,
  };
}

export default async function ConfigureVpsPage({ params }: Props) {
  const { slug } = await params;
  const catalog = getCatalog();

  const plan = catalog.products.find(
    (p) => p.slug === slug && p.category === "cloud-vps" && p.status === "active"
  );

  if (!plan) notFound();

  const locations =
    catalog.locations?.filter(
      (l) =>
        plan.availableLocations?.includes(l.id) && l.status === "active"
    ) ?? [];

  const operatingSystems =
    catalog.operatingSystems?.filter(
      (os) =>
        plan.operatingSystems?.includes(os.id) && os.status === "active"
    ) ?? [];

  const addons =
    catalog.addons?.filter(
      (a) =>
        a.status === "active" &&
        a.compatibleCategories?.includes("cloud-vps")
    ) ?? [];

  const storage = plan.resources?.storage;
  const traffic = plan.resources?.traffic;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sky-400">
            Configure
          </p>
          <h1 className="text-3xl font-bold tracking-tight">{plan.name}</h1>
          <p className="mt-2 max-w-2xl text-slate-400">{plan.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Configuration form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Resources summary */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold">Resources</h2>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-slate-400">vCPU</dt>
                  <dd className="font-medium text-white">
                    {plan.resources?.vcpu ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">RAM</dt>
                  <dd className="font-medium text-white">
                    {plan.resources?.ramGB
                      ? `${plan.resources.ramGB} GB`
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Storage</dt>
                  <dd className="font-medium text-white">
                    {storage
                      ? `${storage.sizeGB} GB ${storage.type}`
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Traffic</dt>
                  <dd className="font-medium text-white">
                    {traffic ? `${traffic.includedTB} TB` : "—"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Location */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold">Location</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {locations.map((loc) => (
                  <label
                    key={loc.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 transition hover:border-sky-500/50 has-[:checked]:border-sky-500 has-[:checked]:bg-sky-500/5"
                  >
                    <input
                      type="radio"
                      name="location"
                      value={loc.id}
                      defaultChecked={loc.id === locations[0]?.id}
                      className="accent-sky-500"
                    />
                    <span>
                      <span className="block font-medium text-white">
                        {loc.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {loc.country}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {locations.length === 0 && (
                <p className="text-sm text-slate-500">
                  No active locations configured for this plan.
                </p>
              )}
            </div>

            {/* Operating System */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold">Operating System</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {operatingSystems.map((os) => (
                  <label
                    key={os.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 transition hover:border-sky-500/50 has-[:checked]:border-sky-500 has-[:checked]:bg-sky-500/5"
                  >
                    <input
                      type="radio"
                      name="os"
                      value={os.id}
                      defaultChecked={os.id === operatingSystems[0]?.id}
                      className="accent-sky-500"
                    />
                    <span>
                      <span className="block font-medium text-white">
                        {os.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {os.version}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            {addons.length > 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <h2 className="mb-4 text-lg font-semibold">Add-ons</h2>
                <div className="space-y-3">
                  {addons.map((addon) => (
                    <label
                      key={addon.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 transition hover:border-sky-500/50 has-[:checked]:border-sky-500 has-[:checked]:bg-sky-500/5"
                    >
                      <input
                        type="checkbox"
                        name="addons"
                        value={addon.id}
                        className="mt-1 accent-sky-500"
                      />
                      <span className="flex-1">
                        <span className="flex items-center justify-between">
                          <span className="font-medium text-white">
                            {addon.name}
                          </span>
                          <span className="text-sm text-sky-400">
                            +{formatZAR(addon.pricing.monthly ?? 0)}/mo
                          </span>
                        </span>
                        {addon.description && (
                          <span className="mt-0.5 block text-xs text-slate-400">
                            {addon.description}
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Billing cycle */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold">Billing cycle</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 transition hover:border-sky-500/50 has-[:checked]:border-sky-500 has-[:checked]:bg-sky-500/5">
                  <input
                    type="radio"
                    name="cycle"
                    value="monthly"
                    defaultChecked
                    className="accent-sky-500"
                  />
                  <span>
                    <span className="block font-medium text-white">Monthly</span>
                    <span className="text-xs text-slate-400">
                      {formatZAR(plan.pricing.monthly ?? 0)} / month
                    </span>
                  </span>
                </label>
                {plan.pricing.annual && (
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 transition hover:border-sky-500/50 has-[:checked]:border-sky-500 has-[:checked]:bg-sky-500/5">
                    <input
                      type="radio"
                      name="cycle"
                      value="annual"
                      className="accent-sky-500"
                    />
                    <span>
                      <span className="block font-medium text-white">
                        Annual
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatZAR(plan.pricing.annual)} / year
                      </span>
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
              <h2 className="mb-4 text-lg font-semibold">Order summary</h2>

              <div className="mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">{plan.name}</span>
                  <span className="font-medium text-white">
                    {formatZAR(plan.pricing.monthly ?? 0)}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Base price · monthly billing
                </p>
              </div>

              <div className="mb-6 border-t border-slate-800 pt-4">
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span className="text-sky-400">
                    {formatZAR(plan.pricing.monthly ?? 0)}
                    <span className="text-sm font-normal text-slate-400">
                      {" "}
                      / mo
                    </span>
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Prices include VAT where applicable
                </p>
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-sky-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Continue to checkout
              </button>

              <p className="mt-4 text-center text-xs text-slate-500">
                Checkout & provisioning will be connected in Phase 2.
              </p>

              {plan.deployment?.instant && (
                <p className="mt-3 text-center text-xs text-emerald-400">
                  ⚡ Instant provisioning (~
                  {plan.deployment.estimatedMinutes ?? 10} min)
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
