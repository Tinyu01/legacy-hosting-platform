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
        badge="Domains · South Africa"
        title="Domain registration"
        highlight="in South Africa"
        description={`Register your .co.za from ${coza?.pricing.registration ? formatZAR(coza.pricing.registration) : "R149"} per year. Search availability, compare extensions, keep DNS next to hosting and VPS.`}
        breadcrumb={[{ label: "Domains" }]}
        cta={{ text: "Search domain", href: "#search" }}
        ctaSecondary={{ text: "Cloud VPS", href: "/cloud-vps" }}
      />

      <section id="search" className="border-b border-white/5 bg-gradient-to-b from-primary to-soft/30">
        <div className="lh-container py-12 md:py-16">
          <div className="mb-8 text-center">
            <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              Search
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Find your{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                domain
              </span>
            </h2>
          </div>

          <form
            action="/domains"
            className="mx-auto flex max-w-xl flex-col gap-2 sm:flex-row"
          >
            <input
              type="text"
              name="q"
              placeholder="yourbusiness.co.za"
              className="h-12 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-highlight/50"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-xl bg-gradient-to-r from-highlight to-accent px-6 text-sm font-semibold text-white"
            >
              Search domain
            </button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {domains.map((d) => (
              <span
                key={d.id}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
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

      <section className="py-16 md:py-24">
        <div className="lh-container">
          <div className="mb-10 text-center md:text-left">
            <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              Pricing
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Browse{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                extensions
              </span>
            </h2>
            <p className="mt-2 text-gray-400">
              Registration · transfer · renewal — per year, ZAR
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40 shadow-xl">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-[11px] uppercase tracking-wider text-white/50">
                <tr>
                  <th className="px-5 py-4 font-medium">Extension</th>
                  <th className="hidden px-5 py-4 font-medium sm:table-cell">
                    Category
                  </th>
                  <th className="px-5 py-4 font-medium">Register</th>
                  <th className="px-5 py-4 font-medium">Transfer</th>
                  <th className="px-5 py-4 font-medium">Renewal</th>
                  <th className="px-5 py-4 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {domains.map((domain) => {
                  const category =
                    domain.tld?.includes(".za") || domain.slug.includes("za")
                      ? "Africa"
                      : "Global";
                  return (
                    <tr
                      key={domain.id}
                      className="transition hover:bg-white/5"
                    >
                      <td className="px-5 py-4">
                        <span className="font-semibold text-white">
                          {domain.tld ?? domain.name}
                        </span>
                      </td>
                      <td className="hidden px-5 py-4 text-white/40 sm:table-cell">
                        {category}
                      </td>
                      <td className="px-5 py-4 font-medium text-white">
                        {domain.pricing.registration
                          ? formatZAR(domain.pricing.registration)
                          : "—"}
                      </td>
                      <td className="px-5 py-4 text-white/50">
                        {domain.pricing.transfer
                          ? formatZAR(domain.pricing.transfer)
                          : "—"}
                      </td>
                      <td className="px-5 py-4 text-white/50">
                        {domain.pricing.renewal
                          ? formatZAR(domain.pricing.renewal)
                          : "—"}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/domains?tld=${encodeURIComponent(domain.slug)}`}
                          className="text-sm font-semibold text-highlight hover:underline"
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
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
