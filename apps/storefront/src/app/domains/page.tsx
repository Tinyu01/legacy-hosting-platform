import Link from "next/link";
import { formatZAR, getActiveDomainProducts } from "../../lib/catalog";
import { PageHeader } from "../../components/PageHeader";
import { FinalCTA } from "../../components/FinalCTA";

export const metadata = {
  title: "Domains",
  description:
    "Register and transfer domains in South Africa. .co.za, .com and more — ZAR pricing.",
};

export default function DomainsPage() {
  const domains = getActiveDomainProducts();
  const coza = domains.find((d) => d.slug === "co-za") ?? domains[0];

  return (
    <main>
      <PageHeader
        badge="DOMAINS · SOUTH AFRICA"
        title="Domain registration"
        highlight="in South Africa"
        description={`Register your .co.za from ${coza?.pricing.registration ? formatZAR(coza.pricing.registration) : "R149"} per year. Search availability, compare extensions, keep DNS next to hosting and VPS.`}
        breadcrumb={[{ label: "Domains" }]}
        cta={{ text: "Search domain", href: "#search" }}
        ctaSecondary={{ text: "Cloud VPS", href: "/cloud-vps" }}
      />

      <section id="search" className="border-b border-border">
        <div className="lh-container py-10">
          <form
            action="/domains"
            className="mx-auto flex max-w-xl flex-col gap-2 sm:flex-row"
          >
            <input
              type="text"
              name="q"
              placeholder="yourbusiness.co.za"
              className="lh-input flex-1"
            />
            <button type="submit" className="lh-btn-primary whitespace-nowrap">
              Search domain
            </button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {domains.map((d) => (
              <span
                key={d.id}
                className="rounded-full border border-border bg-soft px-3 py-1 text-[12px] text-ink-secondary"
              >
                <span className="font-semibold text-highlight">
                  {d.tld ?? d.name}
                </span>{" "}
                {d.pricing.registration
                  ? formatZAR(d.pricing.registration)
                  : ""}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="lh-container py-12">
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-lg font-bold text-ink">Browse extensions</h2>
          <p className="mt-1 text-[13px] text-ink-muted">
            Registration · transfer · renewal — per year, ZAR
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-border bg-soft/80 text-[11px] uppercase tracking-wider text-ink-dim">
              <tr>
                <th className="px-5 py-3.5 font-medium">Extension</th>
                <th className="hidden px-5 py-3.5 font-medium sm:table-cell">
                  Category
                </th>
                <th className="px-5 py-3.5 font-medium">Register</th>
                <th className="px-5 py-3.5 font-medium">Transfer</th>
                <th className="px-5 py-3.5 font-medium">Renewal</th>
                <th className="px-5 py-3.5 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {domains.map((domain) => {
                const category =
                  domain.tld?.includes(".za") || domain.slug.includes("za")
                    ? "Africa"
                    : "Global";
                return (
                  <tr
                    key={domain.id}
                    className="bg-surface/40 transition hover:bg-soft/60"
                  >
                    <td className="px-5 py-4">
                      <span className="font-semibold text-ink">
                        {domain.tld ?? domain.name}
                      </span>
                    </td>
                    <td className="hidden px-5 py-4 text-ink-dim sm:table-cell">
                      {category}
                    </td>
                    <td className="px-5 py-4 font-medium text-ink">
                      {domain.pricing.registration
                        ? formatZAR(domain.pricing.registration)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {domain.pricing.transfer
                        ? formatZAR(domain.pricing.transfer)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {domain.pricing.renewal
                        ? formatZAR(domain.pricing.renewal)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/domains?tld=${encodeURIComponent(domain.slug)}`}
                        className="text-[12px] font-semibold text-highlight"
                      >
                        Register
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
