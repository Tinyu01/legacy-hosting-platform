import type { HostingCatalog, Product } from "@legacy-hosting/types";
import catalogJson from "../../../../catalog/hosting-catalog.json";

/**
 * Client/server storefront catalogue loader.
 * Uses the same hosting-catalog.json as catalog-sdk.
 * Later this can call GET /api/v1/catalog instead.
 */
export function getCatalog(): HostingCatalog {
  return catalogJson as HostingCatalog;
}

export function formatZAR(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getActiveCategories() {
  return getCatalog()
    .categories.filter((c) => (c as { status?: string }).status !== "retired")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getActiveDomainProducts(): Product[] {
  return getCatalog().products.filter(
    (p) => p.category === "domains" && p.status === "active"
  );
}

export function getActiveVpsProducts(): Product[] {
  return getCatalog()
    .products.filter((p) => p.category === "cloud-vps" && p.status === "active")
    .sort(
      (a, b) =>
        ((a.marketing as { displayOrder?: number } | undefined)?.displayOrder ??
          99) -
        ((b.marketing as { displayOrder?: number } | undefined)?.displayOrder ??
          99)
    );
}

export function getActiveWebHostingProducts(): Product[] {
  return getCatalog()
    .products.filter(
      (p) => p.category === "web-hosting" && p.status === "active"
    )
    .sort(
      (a, b) =>
        ((a.marketing as { displayOrder?: number } | undefined)?.displayOrder ??
          99) -
        ((b.marketing as { displayOrder?: number } | undefined)?.displayOrder ??
          99)
    );
}

export function getActiveEmailProducts(): Product[] {
  return getCatalog()
    .products.filter((p) => p.category === "email" && p.status === "active")
    .sort(
      (a, b) =>
        ((a.marketing as { displayOrder?: number } | undefined)?.displayOrder ??
          99) -
        ((b.marketing as { displayOrder?: number } | undefined)?.displayOrder ??
          99)
    );
}

export function getProductBySlug(slug: string): Product | undefined {
  return getCatalog().products.find(
    (p) => p.slug === slug && p.status === "active"
  );
}
