import { loadCatalog, resetCatalogCache } from "../packages/catalog-sdk/src/index";

try {
  resetCatalogCache();
  const catalog = loadCatalog();
  console.log(
    `✔ hosting-catalog.json is valid (${catalog.products.length} products, version ${catalog.catalog.version})`
  );
  process.exit(0);
} catch (err) {
  console.error("✘ hosting-catalog.json failed validation");
  console.error(err);
  process.exit(1);
}
