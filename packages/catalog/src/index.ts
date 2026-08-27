/**
 * @legacy-hosting/catalog
 *
 * Shared catalogue utilities.
 * The canonical source of truth remains catalog/hosting-catalog.json
 * at the monorepo root.
 */

export type ProductStatus =
  | "draft"
  | "active"
  | "maintenance"
  | "sold_out"
  | "deprecated"
  | "retired";

export interface Money {
  currency: "ZAR";
  registration?: number;
  transfer?: number;
  renewal?: number;
  monthly?: number;
  annual?: number;
  setup?: number;
}

export interface Product {
  id: string;
  category: string;
  type: string;
  name: string;
  slug: string;
  tld?: string;
  description?: string;
  pricing: Money;
  status: ProductStatus;
  providerStrategy?: {
    type: "router" | "fixed";
    eligibleProviders?: string[];
    fixedProvider?: string;
  };
}

// In Phase 1 we will load and validate the full JSON catalogue here.
export function getCatalogueVersion(): string {
  return "2026.1.0";
}
