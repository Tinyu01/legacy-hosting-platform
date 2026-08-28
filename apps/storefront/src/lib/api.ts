const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:4000";

export interface CheckoutPayload {
  productSlug: string;
  period: "month" | "year";
  addonIds?: string[];
  locationId?: string;
}

export interface QuoteLineItem {
  id: string;
  name: string;
  kind: string;
  period: string;
  unitPrice: number;
}

export interface CheckoutResult {
  quote: {
    currency: string;
    period: string;
    lineItems: QuoteLineItem[];
    total: number;
  };
  orderReference: string;
  nextStep: string;
}

export async function postCheckout(
  body: CheckoutPayload
): Promise<CheckoutResult> {
  const res = await fetch(`${API_BASE}/api/v1/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? `Checkout failed (${res.status})`);
  }
  return data as CheckoutResult;
}
