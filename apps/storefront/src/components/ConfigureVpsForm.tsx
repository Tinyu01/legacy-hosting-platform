"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatZAR } from "../lib/catalog";

export interface ConfigureLocation {
  id: string;
  name: string;
  country: string;
}

export interface ConfigureOs {
  id: string;
  name: string;
  version: string;
}

export interface ConfigureAddon {
  id: string;
  name: string;
  description?: string;
  monthly: number;
}

interface Props {
  productSlug: string;
  productName: string;
  monthly: number;
  annual?: number;
  locations: ConfigureLocation[];
  operatingSystems: ConfigureOs[];
  addons: ConfigureAddon[];
  instant?: boolean;
  estimatedMinutes?: number;
}

export function ConfigureVpsForm({
  productSlug,
  productName,
  monthly,
  annual,
  locations,
  operatingSystems,
  addons,
  instant,
  estimatedMinutes,
}: Props) {
  const router = useRouter();
  const [locationId, setLocationId] = useState(locations[0]?.id ?? "");
  const [osId, setOsId] = useState(operatingSystems[0]?.id ?? "");
  const [period, setPeriod] = useState<"month" | "year">("month");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const { lineItems, total } = useMemo(() => {
    const base = period === "month" ? monthly : annual ?? monthly * 12;
    const items: { name: string; price: number }[] = [
      { name: productName, price: base },
    ];
    for (const id of selectedAddons) {
      const addon = addons.find((a) => a.id === id);
      if (!addon) continue;
      const price =
        period === "month" ? addon.monthly : addon.monthly * 12;
      items.push({ name: addon.name, price });
    }
    return {
      lineItems: items,
      total: items.reduce((s, i) => s + i.price, 0),
    };
  }, [period, monthly, annual, productName, selectedAddons, addons]);

  const continueToCheckout = () => {
    setSubmitting(true);
    const params = new URLSearchParams({
      product: productSlug,
      period,
      location: locationId,
      os: osId,
    });
    if (selectedAddons.length) {
      params.set("addons", selectedAddons.join(","));
    }
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        {/* Location */}
        <section className="lh-card p-5">
          <h2 className="text-[14px] font-semibold text-white">Location</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {locations.map((loc) => (
              <label
                key={loc.id}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition ${
                  locationId === loc.id
                    ? "border-blue-500 bg-blue-600/10"
                    : "border-[#2a303c] hover:border-[#3d4654]"
                }`}
              >
                <input
                  type="radio"
                  name="location"
                  className="accent-blue-500"
                  checked={locationId === loc.id}
                  onChange={() => setLocationId(loc.id)}
                />
                <span>
                  <span className="block text-[13px] font-medium text-white">
                    {loc.name}
                  </span>
                  <span className="text-[12px] text-[#8b93a1]">{loc.country}</span>
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* OS */}
        <section className="lh-card p-5">
          <h2 className="text-[14px] font-semibold text-white">
            Operating system
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {operatingSystems.map((os) => (
              <label
                key={os.id}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition ${
                  osId === os.id
                    ? "border-blue-500 bg-blue-600/10"
                    : "border-[#2a303c] hover:border-[#3d4654]"
                }`}
              >
                <input
                  type="radio"
                  name="os"
                  className="accent-blue-500"
                  checked={osId === os.id}
                  onChange={() => setOsId(os.id)}
                />
                <span>
                  <span className="block text-[13px] font-medium text-white">
                    {os.name}
                  </span>
                  <span className="text-[12px] text-[#8b93a1]">{os.version}</span>
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Period */}
        <section className="lh-card p-5">
          <h2 className="text-[14px] font-semibold text-white">Billing period</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition ${
                period === "month"
                  ? "border-blue-500 bg-blue-600/10"
                  : "border-[#2a303c] hover:border-[#3d4654]"
              }`}
            >
              <input
                type="radio"
                name="period"
                className="accent-blue-500"
                checked={period === "month"}
                onChange={() => setPeriod("month")}
              />
              <span>
                <span className="block text-[13px] font-medium text-white">
                  Monthly
                </span>
                <span className="text-[12px] text-[#8b93a1]">
                  {formatZAR(monthly)} / month
                </span>
              </span>
            </label>
            {annual != null && (
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition ${
                  period === "year"
                    ? "border-blue-500 bg-blue-600/10"
                    : "border-[#2a303c] hover:border-[#3d4654]"
                }`}
              >
                <input
                  type="radio"
                  name="period"
                  className="accent-blue-500"
                  checked={period === "year"}
                  onChange={() => setPeriod("year")}
                />
                <span>
                  <span className="block text-[13px] font-medium text-white">
                    Annual
                  </span>
                  <span className="text-[12px] text-[#8b93a1]">
                    {formatZAR(annual)} / year
                  </span>
                </span>
              </label>
            )}
          </div>
        </section>

        {/* Add-ons */}
        {addons.length > 0 && (
          <section className="lh-card p-5">
            <h2 className="text-[14px] font-semibold text-white">Add-ons</h2>
            <div className="mt-4 space-y-2">
              {addons.map((addon) => {
                const checked = selectedAddons.includes(addon.id);
                const price =
                  period === "month" ? addon.monthly : addon.monthly * 12;
                return (
                  <label
                    key={addon.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 transition ${
                      checked
                        ? "border-blue-500 bg-blue-600/10"
                        : "border-[#2a303c] hover:border-[#3d4654]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-blue-500"
                      checked={checked}
                      onChange={() => toggleAddon(addon.id)}
                    />
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-[13px] font-medium text-white">
                          {addon.name}
                        </span>
                        <span className="shrink-0 text-[13px] text-blue-400">
                          +{formatZAR(price)}
                          {period === "month" ? "/mo" : "/yr"}
                        </span>
                      </span>
                      {addon.description && (
                        <span className="mt-0.5 block text-[12px] text-[#8b93a1]">
                          {addon.description}
                        </span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Summary */}
      <aside className="lg:col-span-2">
        <div className="sticky top-20 rounded-lg border border-[#2a303c] bg-[#11141a] p-5">
          <h2 className="text-[14px] font-semibold text-white">Order summary</h2>
          <ul className="mt-4 space-y-2 border-b border-[#1c2129] pb-4 text-[13px]">
            {lineItems.map((item) => (
              <li key={item.name} className="flex justify-between gap-3">
                <span className="text-[#8b93a1]">{item.name}</span>
                <span className="font-medium text-white">
                  {formatZAR(item.price)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-[13px] text-[#8b93a1]">Total</span>
            <span className="text-xl font-semibold text-white">
              {formatZAR(total)}
              <span className="text-[13px] font-normal text-[#8b93a1]">
                {" "}
                / {period === "month" ? "mo" : "yr"}
              </span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#5c6573]">
            ZAR · VAT inclusive where applicable
          </p>

          <button
            type="button"
            disabled={submitting || !locationId}
            onClick={continueToCheckout}
            className="lh-btn-primary mt-6 w-full disabled:opacity-50"
          >
            {submitting ? "Redirecting…" : "Continue to checkout"}
          </button>

          {instant && (
            <p className="mt-3 text-center text-[12px] text-emerald-500/90">
              Typical provision ~{estimatedMinutes ?? 10} minutes
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
