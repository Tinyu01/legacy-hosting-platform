import { handleCheckout } from "../apps/api/src/routes/checkout";
import { buildDomainQuote } from "../packages/pricing/src/index";
import { getProductBySlug, resetCatalogCache } from "../packages/catalog-sdk/src/index";

async function main() {
  resetCatalogCache();

  // 1. VPS checkout with add-ons, annual billing
  const vpsResult = await handleCheckout({
    productSlug: "vps-2",
    period: "year",
    addonIds: ["daily-backup", "managed-vps"],
  });
  console.log("VPS checkout:", JSON.stringify(vpsResult, null, 2));

  // 2. Domain registration quote
  const domain = getProductBySlug("co-za")!;
  const domainQuote = buildDomainQuote(domain, "registration");
  console.log("\nDomain registration quote:", JSON.stringify(domainQuote, null, 2));

  // 3. Unknown product must fail
  try {
    await handleCheckout({ productSlug: "does-not-exist", period: "month" });
    console.error("\n✘ Expected an error for unknown product but got none");
    process.exit(1);
  } catch (err) {
    console.log("\n✔ Correctly rejected unknown product:", (err as Error).message);
  }
}

main();
