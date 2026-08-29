import Link from "next/link";
import { formatZAR, getActiveDomainProducts } from "../lib/catalog";

interface DomainSearchProps {
  /** show popular TLD price chips under the search box */
  showTldChips?: boolean;
  className?: string;
}

export function DomainSearch({
  showTldChips = true,
  className = "",
}: DomainSearchProps) {
  const domains = getActiveDomainProducts().slice(0, 4);

  return (
    <div className={className}>
      <form
        action="/domains"
        className="mx-auto flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-surface p-1.5 shadow-2xl shadow-highlight/5 sm:flex-row"
      >
        <input
          type="text"
          name="q"
          placeholder="Find your domain, e.g. yourbusiness.co.za"
          className="lh-input flex-1 border-0 bg-transparent shadow-none focus:shadow-none"
        />
        <button type="submit" className="lh-btn-primary whitespace-nowrap sm:px-8">
          Search
        </button>
      </form>

      {showTldChips && domains.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {domains.map((d) => (
            <span
              key={d.id}
              className="rounded-full border border-border bg-soft px-3 py-1.5 text-[12px] text-ink-secondary"
            >
              <span className="font-semibold text-ink">{d.tld ?? d.name}</span>{" "}
              {d.pricing.registration != null && (
                <strong className="text-highlight">
                  {formatZAR(d.pricing.registration)}/yr
                </strong>
              )}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 text-center text-[13px] text-ink-muted">
        Looking for a server?{" "}
        <Link href="/cloud-vps" className="font-semibold text-highlight hover:underline">
          Browse Cloud VPS →
        </Link>
      </p>
    </div>
  );
}
