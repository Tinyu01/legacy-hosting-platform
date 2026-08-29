import Link from "next/link";
import type { Product } from "@legacy-hosting/types";
import { formatZAR } from "../lib/catalog";

type Resources = {
  vcpu?: number;
  ramGB?: number;
  storage?: { sizeGB: number; type: string };
  traffic?: { includedTB: number };
  ipv4?: number;
};

interface VpsPlanCardProps {
  plan: Product;
  /** denser grid on homepage */
  compact?: boolean;
}

export function VpsPlanCard({ plan, compact = false }: VpsPlanCardProps) {
  const res = plan.resources as Resources | undefined;
  const featured = Boolean(plan.marketing?.featured);
  const badge = plan.marketing?.badge;

  return (
    <article
      className={`relative flex flex-col overflow-hidden p-5 ${
        featured ? "lh-card-featured" : "lh-card"
      } ${compact ? "" : "p-6"}`}
    >
      {featured && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-highlight via-accent to-highlight" />
      )}

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[15px] font-bold text-ink">{plan.name}</h3>
          <p className="text-[11px] uppercase tracking-wider text-ink-dim">
            Linux Cloud
          </p>
        </div>
        {badge && (
          <span className="shrink-0 rounded-full border border-highlight/30 bg-highlight/10 px-2 py-0.5 text-[10px] font-bold uppercase text-highlight">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-highlight">
            {plan.pricing.monthly ? formatZAR(plan.pricing.monthly) : "—"}
          </span>
          <span className="text-[12px] text-ink-dim">/mo</span>
        </p>
        {plan.pricing.annual && (
          <p className="mt-0.5 text-[12px] text-ink-muted">
            or {formatZAR(plan.pricing.annual)} / year
          </p>
        )}
      </div>

      <ul className="mt-4 flex-1 space-y-2 text-[12px]">
        <li className="flex justify-between border-b border-border/60 pb-1.5">
          <span className="text-ink-dim">vCPU</span>
          <span className="font-semibold text-ink">{res?.vcpu ?? "—"} cores</span>
        </li>
        <li className="flex justify-between border-b border-border/60 pb-1.5">
          <span className="text-ink-dim">RAM</span>
          <span className="font-semibold text-ink">
            {res?.ramGB ? `${res.ramGB} GB` : "—"}
          </span>
        </li>
        <li className="flex justify-between border-b border-border/60 pb-1.5">
          <span className="text-ink-dim">Storage</span>
          <span className="font-semibold text-ink">
            {res?.storage ? `${res.storage.sizeGB} GB ${res.storage.type}` : "—"}
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-ink-dim">Traffic</span>
          <span className="font-semibold text-ink">
            {res?.traffic ? `${res.traffic.includedTB} TB` : "—"}
          </span>
        </li>
      </ul>

      <Link
        href={`/cloud-vps/${plan.slug}`}
        className={`mt-5 block rounded-xl py-2.5 text-center text-[13px] font-semibold transition ${
          featured
            ? "bg-highlight text-[#04241f] hover:brightness-105"
            : "border border-border-strong bg-soft/40 text-ink hover:border-highlight/40 hover:text-highlight"
        }`}
      >
        Get Started
      </Link>
    </article>
  );
}
