import { handleCheckout } from "../apps/api/src/routes/checkout";
import { buildDomainQuote } from "../packages/pricing/src/index";
import {
  getProductBySlug,
  resetCatalogCache,
  getActiveProducts,
  getAddonsForCategory,
} from "../packages/catalog-sdk/src/index";

async function main() {
  resetCatalogCache();

  const products = getActiveProducts();
  console.log(`Active products: ${products.length}`);
  console.log(
    "VPS addons:",
    getAddonsForCategory("cloud-vps").map((a) => a.id)
  );

  // 1. VPS checkout with both add-ons, annual billing
  const vpsResult = await handleCheckout({
    productSlug: "vps-2",
    period: "year",
    addonIds: ["daily-backup", "managed-vps-addon"],
    locationId: "za-johannesburg",
  });
  console.log("\nVPS checkout:", JSON.stringify(vpsResult, null, 2));

  // 2. Domain registration quote
  const domain = getProductBySlug("co-za")!;
  const domainQuote = buildDomainQuote(domain, "registration");
  console.log("\nDomain registration quote:", JSON.stringify(domainQuote, null, 2));

  // 3. Monthly VPS without addons
  const monthly = await handleCheckout({
    productSlug: "vps-1",
    period: "month",
  });
  console.log("\nVPS-1 monthly:", JSON.stringify(monthly.quote, null, 2));

  // 4. Unknown product must fail
  try {
    await handleCheckout({ productSlug: "does-not-exist", period: "month" });
    console.error("\n✘ Expected an error for unknown product but got none");
    process.exit(1);
  } catch (err) {
    console.log("\n✔ Correctly rejected unknown product:", (err as Error).message);
  }

  console.log("\n✔ Smoke test passed");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
