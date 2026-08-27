import type { Product, Addon, BillingPeriod, Quote, QuoteLineItem } from "@legacy-hosting/types";

export class PricingError extends Error {}

function priceForPeriod(pricing: { monthly?: number; annual?: number }, period: BillingPeriod): number {
  const price = period === "month" ? pricing.monthly : pricing.annual;
  if (price === undefined) {
    throw new PricingError(`No ${period}ly price defined for this item`);
  }
  return price;
}

export interface QuoteOptions {
  product: Product;
  period: BillingPeriod;
  addons?: Addon[];
}

/**
 * Builds a customer-facing quote. This is the ONLY place total price is
 * computed — the storefront reads pricing off products/addons but never
 * sums them itself, so a pricing rule only ever needs to change here.
 */
export function buildQuote({ product, period, addons = [] }: QuoteOptions): Quote {
  if (product.pricing.monthly === undefined && product.pricing.annual === undefined) {
    throw new PricingError(`Product ${product.id} has no recurring pricing (is it a domain?)`);
  }

  const lineItems: QuoteLineItem[] = [
    {
      id: product.id,
      name: product.name,
      kind: "product",
      period,
      unitPrice: priceForPeriod(product.pricing, period),
    },
    ...addons.map((addon) => ({
      id: addon.id,
      name: addon.name,
      kind: "addon" as const,
      period,
      unitPrice:
        period === "month"
          ? priceForPeriod(addon.pricing, "month")
          : priceForPeriod(addon.pricing, "month") * 12,
    })),
  ];

  const total = lineItems.reduce((sum, item) => sum + item.unitPrice, 0);

  return {
    currency: product.pricing.currency,
    period,
    lineItems,
    total,
  };
}

/** Domains use registration/transfer/renewal pricing instead of recurring billing. */
export function buildDomainQuote(
  product: Product,
  operation: "registration" | "transfer" | "renewal"
): Quote {
  const unitPrice = product.pricing[operation];
  if (unitPrice === undefined) {
    throw new PricingError(`Product ${product.id} has no ${operation} price`);
  }
  return {
    currency: product.pricing.currency,
    period: "year",
    lineItems: [
      {
        id: product.id,
        name: `${product.name} — ${operation}`,
        kind: "product",
        period: "year",
        unitPrice,
      },
    ],
    total: unitPrice,
  };
}
