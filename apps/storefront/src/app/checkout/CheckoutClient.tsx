"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatZAR } from "../../lib/catalog";
import { postCheckout, type CheckoutResult } from "../../lib/api";

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
      <div className="lh-card p-6 text-[13px] text-[#8b93a1]">
        Calculating quote from Legacy Hosting API…
      </div>
    );
  }

  if (error) {
    return (
      <div className="lh-card border-red-500/30 p-6">
        <p className="text-[14px] font-medium text-red-400">Checkout error</p>
        <p className="mt-2 text-[13px] text-[#8b93a1]">{error}</p>
        <p className="mt-3 text-[12px] text-[#5c6573]">
          Ensure the API is running:{" "}
          <code className="text-[#8b93a1]">npm run api</code> on port 4000.
        </p>
        <Link
          href="/cloud-vps"
          className="mt-4 inline-block text-[13px] font-semibold text-blue-400"
        >
          ← Back to Cloud VPS
        </Link>
      </div>
    );
  }

  if (!result) return null;

  const { quote, orderReference } = result;

  return (
    <div className="space-y-6">
      <div className="lh-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[12px] text-[#5c6573]">Order reference</p>
            <p className="mt-0.5 font-mono text-[14px] font-medium text-white">
              {orderReference}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-[#5c6573]">Period</p>
            <p className="mt-0.5 text-[14px] font-medium capitalize text-white">
              {quote.period === "year" ? "Annual" : "Monthly"}
            </p>
          </div>
        </div>

        {(location || os) && (
          <dl className="mt-6 grid gap-3 border-t border-[#1c2129] pt-4 text-[13px] sm:grid-cols-2">
            {location && (
              <div>
                <dt className="text-[#5c6573]">Location</dt>
                <dd className="font-medium text-white">{location}</dd>
              </div>
            )}
            {os && (
              <div>
                <dt className="text-[#5c6573]">Operating system</dt>
                <dd className="font-medium text-white">{os}</dd>
              </div>
            )}
          </dl>
        )}

        <ul className="mt-6 space-y-2 border-t border-[#1c2129] pt-4">
          {quote.lineItems.map((item) => (
            <li
              key={item.id + item.name}
              className="flex justify-between gap-4 text-[13px]"
            >
              <span className="text-[#8b93a1]">
                {item.name}
                <span className="ml-2 text-[11px] uppercase text-[#5c6573]">
                  {item.kind}
                </span>
              </span>
              <span className="font-medium text-white">
                {formatZAR(item.unitPrice)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-baseline justify-between border-t border-[#1c2129] pt-4">
          <span className="text-[13px] text-[#8b93a1]">Total</span>
          <span className="text-2xl font-semibold text-white">
            {formatZAR(quote.total)}
            <span className="text-[13px] font-normal text-[#8b93a1]">
              {" "}
              {quote.currency}
            </span>
          </span>
        </div>
      </div>

      <div className="lh-card p-6">
        <h2 className="text-[14px] font-semibold text-white">Payment</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[#8b93a1]">
          Live payment (PayFast / Ozow / EFT) is wired through FOSSBilling in
          the next phase. Your order reference is ready for the billing engine.
        </p>
        <button
          type="button"
          disabled
          className="lh-btn-primary mt-5 w-full opacity-60"
        >
          Proceed to payment (coming next)
        </button>
        <p className="mt-3 text-center text-[12px] text-[#5c6573]">
          Next step from API: <code>{result.nextStep}</code>
        </p>
      </div>

      <div className="flex justify-between text-[13px]">
        <Link href={`/cloud-vps/${product}`} className="text-blue-400 hover:text-blue-300">
          ← Edit configuration
        </Link>
        <Link href="/cloud-vps" className="text-[#8b93a1] hover:text-white">
          All VPS plans
        </Link>
      </div>
    </div>
  );
}
