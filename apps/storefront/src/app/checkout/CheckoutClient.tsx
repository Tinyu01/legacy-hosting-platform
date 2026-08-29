"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatZAR } from "../../lib/catalog";
import { postCheckout, type CheckoutResult } from "../../lib/api";

const VAT_RATE = 0.15;

export function CheckoutClient() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<CheckoutResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const product = searchParams.get("product") ?? "";
  const period = (searchParams.get("period") === "year" ? "year" : "month") as
    | "month"
    | "year";
  const location = searchParams.get("location") ?? undefined;
  const os = searchParams.get("os") ?? undefined;
  const addonsParam = searchParams.get("addons");
  const addonIds = addonsParam
    ? addonsParam.split(",").filter(Boolean)
    : undefined;

  useEffect(() => {
    if (!product) {
      setError("Missing product. Start from a Cloud VPS plan.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await postCheckout({
          productSlug: product,
          period,
          locationId: location,
          addonIds,
        });
        if (!cancelled) {
          setResult(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
          setResult(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [product, period, location, addonsParam]);

  if (loading) {
    return (
      <div className="lh-card p-6 text-[13px] text-ink-muted">
        Calculating quote from Legacy Hosting API…
      </div>
    );
  }

  if (error) {
    return (
      <div className="lh-card border-red-500/30 p-6">
        <p className="text-[14px] font-medium text-red-500">Checkout error</p>
        <p className="mt-2 text-[13px] text-ink-muted">{error}</p>
        <p className="mt-3 text-[12px] text-ink-dim">
          Ensure the API is running:{" "}
          <code className="text-ink-muted">npm run api</code> on port 4000.
        </p>
        <Link
          href="/cloud-vps"
          className="mt-4 inline-block text-[13px] font-semibold text-highlight"
        >
          ← Back to Cloud VPS
        </Link>
      </div>
    );
  }

  if (!result) return null;

  const { quote, orderReference } = result;
  // Catalogue totals are treated as excl. VAT for display split (ZA commercial UX).
  // Billing engine will be authoritative once FOSSBilling is wired.
  const subtotal = quote.total;
  const vat = Math.round(subtotal * VAT_RATE);
  const totalIncl = subtotal + vat;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <div className="lh-card p-6">
          <h2 className="text-[15px] font-bold text-ink">Account</h2>
          <p className="mt-1 text-[12px] text-ink-dim">
            Guest checkout for quotes. Accounts wire in with FOSSBilling.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-[12px] text-ink-muted">Full name</label>
              <input type="text" className="lh-input mt-1" placeholder="Your name" disabled />
            </div>
            <div>
              <label className="text-[12px] text-ink-muted">Email</label>
              <input type="email" className="lh-input mt-1" placeholder="you@company.co.za" disabled />
            </div>
          </div>
        </div>

        <div className="lh-card p-6">
          <h2 className="text-[15px] font-bold text-ink">Payment method</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Card", "EFT", "Ozow"].map((m, i) => (
              <div
                key={m}
                className={`rounded-xl border p-4 text-center text-[13px] font-medium ${
                  i === 0
                    ? "border-highlight bg-highlight/10 text-ink"
                    : "border-border text-ink-muted"
                }`}
              >
                {m}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-ink-dim">
            Secured checkout · payments processed in ZAR (PayFast / Ozow / EFT next phase)
          </p>
          <button type="button" disabled className="lh-btn-primary mt-5 w-full opacity-60">
            Pay and activate (coming next)
          </button>
          <p className="mt-2 text-center text-[11px] text-ink-dim">
            API next step: <code>{result.nextStep}</code>
          </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="lh-card sticky top-24 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-ink-dim">Order reference</p>
              <p className="mt-0.5 font-mono text-[13px] font-medium text-ink">
                {orderReference}
              </p>
            </div>
            <p className="text-[12px] capitalize text-ink-muted">
              {quote.period === "year" ? "Annual" : "Monthly"}
            </p>
          </div>

          {(location || os) && (
            <dl className="mt-4 grid gap-2 border-t border-border pt-4 text-[12px]">
              {location && (
                <div className="flex justify-between">
                  <dt className="text-ink-dim">Location</dt>
                  <dd className="font-medium text-ink">{location}</dd>
                </div>
              )}
              {os && (
                <div className="flex justify-between">
                  <dt className="text-ink-dim">OS</dt>
                  <dd className="font-medium text-ink">{os}</dd>
                </div>
              )}
            </dl>
          )}

          <ul className="mt-4 space-y-2 border-t border-border pt-4">
            {quote.lineItems.map((item) => (
              <li
                key={item.id + item.name}
                className="flex justify-between gap-4 text-[13px]"
              >
                <span className="text-ink-muted">
                  {item.name}
                  <span className="ml-1 text-[10px] uppercase text-ink-dim">
                    {item.kind}
                  </span>
                </span>
                <span className="font-mono font-medium text-ink">
                  {formatZAR(item.unitPrice)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 border-t border-border pt-4 text-[13px]">
            <div className="flex justify-between text-ink-muted">
              <span>Subtotal</span>
              <span className="font-mono">{formatZAR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>VAT (15%)</span>
              <span className="font-mono">{formatZAR(vat)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-border pt-3">
              <span className="font-bold text-ink">Total due today</span>
              <span className="text-2xl font-black text-highlight">
                {formatZAR(totalIncl)}
              </span>
            </div>
            <p className="text-[11px] text-ink-dim">
              Display split for ZA checkout UX. Billing engine becomes source of truth next.
            </p>
          </div>

          <div className="mt-6 flex justify-between text-[12px]">
            <Link href={`/cloud-vps/${product}`} className="text-highlight hover:underline">
              ← Edit configuration
            </Link>
            <Link href="/cloud-vps" className="text-ink-dim hover:text-ink">
              All plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
