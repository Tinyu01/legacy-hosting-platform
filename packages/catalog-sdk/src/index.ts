import fs from "fs";
import path from "path";
import Ajv, { ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import type {
  HostingCatalog,
  Product,
  Category,
  Addon,
  Location,
  OperatingSystem,
  Provider,
  LifecycleStatus,
} from "@legacy-hosting/types";

export class CatalogValidationError extends Error {
  constructor(public errors: unknown) {
    super("hosting-catalog.json failed schema validation");
    this.name = "CatalogValidationError";
  }
}

let cachedCatalog: HostingCatalog | null = null;
let cachedValidator: ValidateFunction | null = null;

function getValidator(): ValidateFunction {
  if (cachedValidator) return cachedValidator;
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const schemaPath = path.join(__dirname, "../../../catalog/schemas/hosting-catalog.schema.json");
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
  cachedValidator = ajv.compile(schema);
  return cachedValidator;
}

/**
 * Loads hosting-catalog.json, validates it against the schema, and caches it.
 * Throws CatalogValidationError if the catalog is malformed.
 */
export function loadCatalog(catalogPath?: string): HostingCatalog {
  if (cachedCatalog) return cachedCatalog;

  const resolvedPath =
    catalogPath ?? path.join(__dirname, "../../../catalog/hosting-catalog.json");
  const raw = JSON.parse(fs.readFileSync(resolvedPath, "utf-8"));

  const validate = getValidator();
  if (!validate(raw)) {
    throw new CatalogValidationError(validate.errors);
  }

  cachedCatalog = raw as HostingCatalog;
  return cachedCatalog;
}

export function resetCatalogCache(): void {
  cachedCatalog = null;
}

export function getCategories(catalog = loadCatalog()): Category[] {
  return [...catalog.categories].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getActiveProducts(catalog = loadCatalog()): Product[] {
  return catalog.products.filter((p) => p.status === "active");
}

export function getProductsByCategory(categoryId: string, catalog = loadCatalog()): Product[] {
  return getActiveProducts(catalog).filter((p) => p.category === categoryId);
}

export function getProductBySlug(slug: string, catalog = loadCatalog()): Product | undefined {
  return catalog.products.find((p) => p.slug === slug);
}

export function getProductById(id: string, catalog = loadCatalog()): Product | undefined {
  return catalog.products.find((p) => p.id === id);
}

export function getAddonsForCategory(categoryId: string, catalog = loadCatalog()): Addon[] {
  return (catalog.addons ?? []).filter(
    (a) => a.status === "active" && a.compatibleCategories.includes(categoryId)
  );
}

export function getAddonById(id: string, catalog = loadCatalog()): Addon | undefined {
  return (catalog.addons ?? []).find((a) => a.id === id);
}

export function getAvailableLocationsForProduct(
  product: Product,
  catalog = loadCatalog()
): Location[] {
  const ids = new Set(product.availableLocations ?? []);
  return (catalog.locations ?? []).filter((l) => ids.has(l.id) && l.status === "active");
}

export function getOperatingSystemsForProduct(
  product: Product,
  catalog = loadCatalog()
): OperatingSystem[] {
  const ids = new Set(product.operatingSystems ?? []);
  return (catalog.operatingSystems ?? []).filter(
    (os) => ids.has(os.id) && os.status === "active"
  );
}

export function getEligibleProviders(product: Product, catalog = loadCatalog()): Provider[] {
  const ids = new Set(product.providerStrategy.eligibleProviders);
  return catalog.providers.filter((p) => ids.has(p.id) && p.status === "active");
}

export function isPurchasable(product: Product, catalog = loadCatalog()): boolean {
  if (product.status !== "active") return false;
  return getEligibleProviders(product, catalog).length > 0;
}

export function statusLabel(status: LifecycleStatus): string {
  const labels: Record<LifecycleStatus, string> = {
    draft: "Coming soon",
    active: "Available",
    maintenance: "Temporarily unavailable",
    sold_out: "Currently unavailable",
    deprecated: "No longer sold",
    retired: "Retired",
    planned: "Planned",
  };
  return labels[status];
}
