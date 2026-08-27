/**
 * Legacy Hosting — shared domain types.
 * These mirror catalog/schemas/hosting-catalog.schema.json.
 * Keep the two in sync: the schema is the runtime contract,
 * these types are the compile-time contract.
 */

export type LifecycleStatus =
  | "draft"
  | "active"
  | "maintenance"
  | "sold_out"
  | "deprecated"
  | "retired"
  | "planned";

export type BillingPeriod = "month" | "year";

export interface CatalogMeta {
  id: string;
  name: string;
  brand?: string;
  version: string;
  currency: "ZAR";
  country: string;
  locale: string;
  tax?: { enabled: boolean; displayMode: "inclusive" | "exclusive" };
}

export interface Platform {
  storefront: string;
  portal: string;
  corporate?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  displayOrder: number;
}

export interface Location {
  id: string;
  name: string;
  country?: string;
  countryCode?: string;
  region?: string;
  timezone?: string;
  currency?: string;
  status: LifecycleStatus;
}

export interface OperatingSystem {
  id: string;
  name: string;
  version: string;
  slug?: string;
  family: "linux" | "bsd" | "windows";
  status: LifecycleStatus;
}

export type ProviderType = "registrar" | "cloud" | "shared-hosting" | "payment";

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  adapter: string;
  /** Name of the env var holding credentials. Never store the credential itself here. */
  environmentVariable: string;
  status: LifecycleStatus;
}

export interface PaymentMethod {
  id: string;
  name: string;
  currency: string;
  type: "gateway" | "manual";
  status: LifecycleStatus;
}

export interface Pricing {
  currency: string;
  registration?: number;
  transfer?: number;
  renewal?: number;
  monthly?: number;
  annual?: number;
}

export interface Addon {
  id: string;
  name: string;
  type: string;
  pricing: Pricing;
  features?: string[];
  compatibleCategories: string[];
  status: LifecycleStatus;
}

export interface ProviderStrategy {
  type: "router" | "fixed";
  eligibleProviders: string[];
}

export interface BillingIntegration {
  engine: string;
  mapping?: Record<string, unknown>;
  cycles?: { period: BillingPeriod; price: number }[];
}

export type ProductType =
  | "domain"
  | "shared-hosting"
  | "vps"
  | "dedicated"
  | "email"
  | "infrastructure";

export interface Product {
  id: string;
  category: string;
  type: ProductType;
  name: string;
  slug: string;
  tld?: string;
  description?: string;
  marketing?: { label?: string; badge?: string; featured?: boolean };
  pricing: Pricing;
  billing?: Record<string, unknown>;
  resources?: Record<string, unknown>;
  operations?: Record<string, unknown>;
  requirements?: Record<string, unknown>;
  deployment?: { instant?: boolean; estimatedMinutes?: number };
  availableLocations?: string[];
  operatingSystems?: string[];
  features?: string[];
  controlPanel?: string;
  provisioning?: Record<string, unknown>;
  portal?: Record<string, boolean>;
  providerStrategy: ProviderStrategy;
  billingIntegration?: BillingIntegration;
  status: LifecycleStatus;
}

export interface Policies {
  billing?: Record<string, unknown>;
  domains?: Record<string, unknown>;
  hosting?: Record<string, unknown>;
  vps?: Record<string, unknown>;
  cancellation?: Record<string, unknown>;
}

export interface HostingCatalog {
  $schema?: string;
  catalog: CatalogMeta;
  platform: Platform;
  categories: Category[];
  locations?: Location[];
  operatingSystems?: OperatingSystem[];
  providers: Provider[];
  paymentMethods: PaymentMethod[];
  addons?: Addon[];
  products: Product[];
  policies?: Policies;
}

/** A resolved line item, used by the pricing engine. */
export interface QuoteLineItem {
  id: string;
  name: string;
  kind: "product" | "addon";
  period: BillingPeriod;
  unitPrice: number;
}

export interface Quote {
  currency: string;
  period: BillingPeriod;
  lineItems: QuoteLineItem[];
  total: number;
}
