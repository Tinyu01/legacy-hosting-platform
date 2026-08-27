import type { Product, Provider } from "@legacy-hosting/types";

export interface ProviderHealth {
  providerId: string;
  available: boolean;
  /** 0-1, lower is more loaded / more expensive right now */
  score: number;
}

export interface RouteRequest {
  product: Product;
  locationId?: string;
  preferredProviderId?: string;
}

export interface RouteDecision {
  provider: Provider;
  reason: string;
}

export class NoEligibleProviderError extends Error {
  constructor(productId: string) {
    super(`No active provider can currently fulfil product "${productId}"`);
  }
}

export type ProviderHealthSource = (providerIds: string[]) => Promise<ProviderHealth[]>;

const defaultHealthSource: ProviderHealthSource = async (providerIds) =>
  providerIds.map((id) => ({ providerId: id, available: true, score: 0.5 }));

/**
 * Chooses which infrastructure supplier fulfils an order.
 * The storefront never sees Hetzner/Contabo — only "Legacy VPS 1".
 */
export class ProviderRouter {
  constructor(
    private readonly getProviders: (ids: string[]) => Provider[],
    private readonly healthSource: ProviderHealthSource = defaultHealthSource
  ) {}

  async route(request: RouteRequest): Promise<RouteDecision> {
    const { product, preferredProviderId } = request;
    const eligibleIds = product.providerStrategy.eligibleProviders;

    if (eligibleIds.length === 0) {
      throw new NoEligibleProviderError(product.id);
    }

    const candidates = this.getProviders(eligibleIds).filter((p) => p.status === "active");
    if (candidates.length === 0) {
      throw new NoEligibleProviderError(product.id);
    }

    if (product.providerStrategy.type === "fixed") {
      return { provider: candidates[0], reason: "fixed-strategy" };
    }

    const health = await this.healthSource(candidates.map((c) => c.id));
    const healthById = new Map(health.map((h) => [h.providerId, h]));

    const available = candidates.filter((c) => healthById.get(c.id)?.available !== false);
    if (available.length === 0) {
      throw new NoEligibleProviderError(product.id);
    }

    if (preferredProviderId) {
      const preferred = available.find((p) => p.id === preferredProviderId);
      if (preferred) {
        return { provider: preferred, reason: "customer-preference" };
      }
    }

    const ranked = [...available].sort(
      (a, b) => (healthById.get(a.id)?.score ?? 1) - (healthById.get(b.id)?.score ?? 1)
    );

    return { provider: ranked[0], reason: "lowest-load-score" };
  }
}
