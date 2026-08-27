import type { Category, HostingCatalog, Product } from "./types";

/**
 * Current catalogue version (kept in sync with hosting-catalog.json)
 */
export function getCatalogueVersion(): string {
  return "2026.1.0";
}

/**
 * Format a number as South African Rand.
 * Example: 149 → "R149"
 */
export function formatZAR(amount: number, options?: { decimals?: boolean }): string {
  const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: options?.decimals ? 2 : 0,
    maximumFractionDigits: options?.decimals ? 2 : 0,
  });
  return formatter.format(amount);
}

/**
 * Return only products that are publicly sellable.
 */
export function getActiveProducts(catalog: HostingCatalog): Product[] {
  return catalog.products.filter((p) => p.status === "active");
}

/**
 * Filter active products by category id.
 */
export function getProductsByCategory(
  catalog: HostingCatalog,
  categoryId: string
): Product[] {
  return getActiveProducts(catalog).filter((p) => p.category === categoryId);
}

/**
 * Find a category by its slug.
 */
export function getCategoryBySlug(
  catalog: HostingCatalog,
  slug: string
): Category | undefined {
  return catalog.categories.find((c) => c.slug === slug && c.status !== "retired");
}

/**
 * Find a product by its slug.
 */
export function getProductBySlug(
  catalog: HostingCatalog,
  slug: string
): Product | undefined {
  return catalog.products.find((p) => p.slug === slug && p.status === "active");
}
