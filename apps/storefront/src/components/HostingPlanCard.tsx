import Link from "next/link";
import type { Product } from "@legacy-hosting/types";
import { formatZAR } from "../lib/catalog";

type HostingResources = {
  storageGB?: number;
  websites?: number;
  databases?: number;
  mailboxes?: number;
};

interface HostingPlanCardProps {
  plan: Product;
}

export function HostingPlanCard({ plan }: HostingPlanCardProps) {
  const res = (plan.resources ?? {}) as HostingResources;
  const featured = Boolean(plan.marketing?.featured);
  const badge = plan.marketing?.badge;
  const features = Array.isArray(plan.features) ? plan.features.slice(0, 5) : [];

  return (
    <article
      className={`relative flex flex-col overflow-hidden p-6 ${
        featured ? "lh-card-featured" : "lh-card"
      }`}
    >
      {featured && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-highlight via-accent to-highlight" />
      )}

      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-bold text-ink">{plan.name}</h3>
        {badge && (
          <span className="shrink-0 rounded-full border border-highlight/30 bg-highlight/10 px-2 py-0.5 text-[10px] font-bold uppercase text-highlight">
            {badge}
          </span>
        )}
      </div>

      <p className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-black text-highlight">
          {plan.pricing.monthly != null ? formatZAR(plan.pricing.monthly) : "—"}
        </span>
        <span className="text-[12px] text-ink-dim">/mo</span>
      </p>
      {plan.pricing.annual != null && (
        <p className="mt-0.5 text-[12px] text-ink-muted">
          or {formatZAR(plan.pricing.annual)} / year
        </p>
      )}

      <ul className="mt-5 space-y-2 text-[12px]">
        <li className="flex justify-between border-b border-border/50 pb-1.5">
          <span className="text-ink-dim">Websites</span>
          <span className="font-semibold text-ink">{res.websites ?? "—"}</span>
        </li>
        <li className="flex justify-between border-b border-border/50 pb-1.5">
          <span className="text-ink-dim">Storage</span>
          <span className="font-semibold text-ink">
            {res.storageGB != null ? `${res.storageGB} GB NVMe` : "—"}
          </span>
        </li>
        <li className="flex justify-between border-b border-border/50 pb-1.5">
          <span className="text-ink-dim">Mailboxes</span>
          <span className="font-semibold text-ink">{res.mailboxes ?? "—"}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-ink-dim">Databases</span>
          <span className="font-semibold text-ink">{res.databases ?? "—"}</span>
        </li>
      </ul>

      {features.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-[12px] text-ink-muted">
          {features.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-highlight">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/web-hosting"
        className={`mt-6 block rounded-xl py-2.5 text-center text-[13px] font-semibold transition ${
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
