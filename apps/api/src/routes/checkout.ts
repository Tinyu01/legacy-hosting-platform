import {
  getProductBySlug,
  getAddonById,
  isPurchasable,
  loadCatalog,
} from "@legacy-hosting/catalog-sdk";
import { buildQuote } from "@legacy-hosting/pricing";
import { ProviderRouter } from "@legacy-hosting/provisioning";
import type { Provider, BillingPeriod } from "@legacy-hosting/types";

export interface CheckoutRequestBody {
  productSlug: string;
  period: BillingPeriod;
  addonIds?: string[];
  locationId?: string;
}

export interface CheckoutResponseBody {
  quote: ReturnType<typeof buildQuote>;
  // Deliberately does NOT include which provider was chosen.
  orderReference: string;
  nextStep: "payment";
}

/**
 * Framework-agnostic handler. Wire into Express / Next / Nest.
 */
export async function handleCheckout(
  body: CheckoutRequestBody
): Promise<CheckoutResponseBody> {
  const catalog = loadCatalog();

  const product = getProductBySlug(body.productSlug, catalog);
  if (!product) {
    throw new Error(`Unknown product: ${body.productSlug}`);
  }
  if (!isPurchasable(product, catalog)) {
    throw new Error(`Product ${product.slug} is not currently purchasable`);
  }

  const addons = (body.addonIds ?? [])
    .map((id) => getAddonById(id, catalog))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const quote = buildQuote({ product, period: body.period, addons });

  const router = new ProviderRouter((ids: string[]) =>
    catalog.providers.filter((p: Provider) => ids.includes(p.id))
  );
  await router.route({ product, locationId: body.locationId });

  return {
    quote,
    orderReference: `LH-${Date.now()}`,
    nextStep: "payment",
  };
}
