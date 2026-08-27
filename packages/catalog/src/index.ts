/**
 * @legacy-hosting/catalog
 *
 * Shared catalogue utilities for Legacy Hosting.
 * The canonical source of truth is catalog/hosting-catalog.json
 */

export type {
  ProductStatus,
  CategoryStatus,
  LocationStatus,
  ProductType,
  Money,
  Marketing,
  Resources,
  ProviderStrategy,
  PortalCapabilities,
  Product,
  Category,
  Addon,
  Location,
  OperatingSystem,
  HostingCatalog,
} from "./types";

export { getCatalogueVersion, formatZAR, getActiveProducts, getProductsByCategory, getCategoryBySlug, getProductBySlug } from "./helpers";
