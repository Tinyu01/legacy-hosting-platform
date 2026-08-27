import type { HostingCatalog } from "@legacy-hosting/catalog";
import catalogJson from "../../../../catalog/hosting-catalog.json";

/**
 * Loads the commercial catalogue.
 * In production this can later be swapped for an API call
 * without changing any consuming component.
 */
export function getCatalog(): HostingCatalog {
  return catalogJson as HostingCatalog;
}

export function getActiveCategories() {
  const catalog = getCatalog();
  return catalog.categories
    .filter((c) => c.status === "active" || !c.status)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getActiveDomainProducts() {
  const catalog = getCatalog();
  return catalog.products.filter(
    (p) => p.category === "domains" && p.status === "active"
  );
}

export function getActiveVpsProducts() {
  const catalog = getCatalog();
  return catalog.products
    .filter((p) => p.category === "cloud-vps" && p.status === "active")
    .sort(
      (a, b) =>
        (a.marketing?.displayOrder ?? 99) - (b.marketing?.displayOrder ?? 99)
    );
}

export function getActiveWebHostingProducts() {
  const catalog = getCatalog();
  return catalog.products
    .filter((p) => p.category === "web-hosting" && p.status === "active")
    .sort(
      (a, b) =>
        (a.marketing?.displayOrder ?? 99) - (b.marketing?.displayOrder ?? 99)
    );
}
