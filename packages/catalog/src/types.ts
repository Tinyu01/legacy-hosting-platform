/**
 * Shared TypeScript types for the Legacy Hosting commercial catalogue.
 * These mirror catalog/hosting-catalog.json and its JSON Schema.
 */

export type ProductStatus =
  | "draft"
  | "active"
  | "maintenance"
  | "sold_out"
  | "deprecated"
  | "retired";

export type CategoryStatus = "active" | "draft" | "maintenance" | "retired";

export type LocationStatus = "active" | "planned" | "maintenance" | "disabled";

export type ProductType =
  | "domain"
  | "shared-hosting"
  | "reseller-hosting"
  | "managed-wordpress"
  | "vps"
  | "managed-vps"
  | "dedicated"
  | "email"
  | "storage"
  | "addon";

export interface Money {
  currency: "ZAR";
  registration?: number;
  transfer?: number;
  renewal?: number;
  monthly?: number;
  annual?: number;
  setup?: number;
}

export interface Marketing {
  label?: string;
  badge?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface Resources {
  vcpu?: number;
  ramGB?: number;
  storage?: {
    sizeGB: number;
    type: "NVMe" | "SSD" | "HDD";
  };
  storageGB?: number;
  traffic?: {
    includedTB: number;
  };
  websites?: number;
  databases?: number;
  mailboxes?: number;
  ipv4?: number;
  ipv6?: boolean;
}

export interface ProviderStrategy {
  type: "router" | "fixed";
  eligibleProviders?: string[];
  fixedProvider?: string;
}

export interface PortalCapabilities {
  console?: boolean;
  restart?: boolean;
  shutdown?: boolean;
  reinstall?: boolean;
  resize?: boolean;
  snapshots?: boolean;
  firewall?: boolean;
  metrics?: boolean;
  dns?: boolean;
  backups?: boolean;
}

export interface Product {
  id: string;
  category: string;
  type: ProductType;
  name: string;
  slug: string;
  tld?: string;
  description?: string;
  marketing?: Marketing;
  pricing: Money;
  billing?: {
    period?: "year" | "month";
    cycle?: ("monthly" | "annual")[];
    autoRenew?: boolean;
    engine?: "fossbilling";
    mapping?: {
      productType?: string;
      externalProductId?: string;
    };
  };
  resources?: Resources;
  features?: string[];
  operations?: {
    availabilityCheck?: boolean;
    registration?: boolean;
    transfer?: boolean;
    renewal?: boolean;
    dnsManagement?: boolean;
  };
  requirements?: {
    authCodeForTransfer?: boolean;
  };
  deployment?: {
    instant?: boolean;
    estimatedMinutes?: number;
  };
  availableLocations?: string[];
  operatingSystems?: string[];
  controlPanel?: string;
  providerStrategy?: ProviderStrategy;
  portal?: PortalCapabilities;
  status: ProductStatus;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  displayOrder: number;
  status?: CategoryStatus;
}

export interface Addon {
  id: string;
  name: string;
  type: string;
  description?: string;
  pricing: Money;
  features?: string[];
  compatibleCategories?: string[];
  compatibleProducts?: string[];
  status: ProductStatus;
}

export interface Location {
  id: string;
  name: string;
  country?: string;
  countryCode?: string;
  region?: string;
  timezone?: string;
  currency?: string;
  status: LocationStatus;
}

export interface OperatingSystem {
  id: string;
  name: string;
  version: string;
  slug?: string;
  family: "linux" | "windows";
  status: "active" | "draft" | "retired";
}

export interface HostingCatalog {
  catalog: {
    id: string;
    name: string;
    brand: string;
    version: string;
    currency: "ZAR";
    country: "ZA";
    locale: "en-ZA";
    tax?: {
      enabled: boolean;
      displayMode: "inclusive" | "exclusive";
      rate?: number;
    };
  };
  platform: {
    storefront: string;
    portal: string;
    corporate: string;
    api?: string;
  };
  categories: Category[];
  products: Product[];
  addons?: Addon[];
  locations?: Location[];
  operatingSystems?: OperatingSystem[];
  controlPanels?: Array<{
    id: string;
    name: string;
    slug?: string;
    status?: string;
  }>;
  providers?: Array<{
    id: string;
    name: string;
    type: string;
    adapter: string;
    environmentVariable?: string;
    status?: string;
  }>;
  paymentMethods?: Array<{
    id: string;
    name: string;
    currency: string;
    type: "gateway" | "manual";
    status?: string;
  }>;
  policies?: Record<string, unknown>;
}
