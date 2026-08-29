import Link from "next/link";
import { formatZAR, getActiveDomainProducts } from "../../lib/catalog";

export const metadata = {
  title: "Domains",
  description:
    "Register and transfer domains in South Africa. .co.za, .com, .net and more — ZAR pricing.",
};

export default function DomainsPage() {
  const domains = getActiveDomainProducts();
  const coza = domains.find((d) => d.slug === "co-za") ?? domains[0];

  return (
    <main>
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="lh-section-label">Domains · South Africa</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Domain registration in South Africa
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400">
            Register your .co.za domain from{" "}
            {coza?.pricing.registration
              ? formatZAR(coza.pricing.registration)
              : "R149"}{" "}
            per year. Search availability, compare extensions, and keep DNS next
            to your hosting and VPS.
          </p>

          <form
            action="/domains"
            className="mt-8 flex max-w-xl flex-col gap-2 sm:flex-row"
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

          <div className="mt-6 flex flex-wrap gap-2">
            {domains.map((d) => (
              <span
                key={d.id}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-gray-300"
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

          <p className="mt-4 text-[12px] text-gray-500">
            Already own a domain?{" "}
            <span className="text-gray-400">Transfer it into Legacy Hosting.</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white">
            Browse domain extensions
          </h2>
          <p className="mt-1 text-[13px] text-gray-500">
            Registration, transfer and renewal — per year, ZAR
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-white/10 bg-soft/80 text-[11px] uppercase tracking-wider text-gray-500">
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
            <tbody className="divide-y divide-white/5">
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
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {domain.tld ?? domain.name}
                        </span>
                        {domain.marketing?.badge && (
                          <span className="rounded bg-highlight/15 px-1.5 py-0.5 text-[10px] font-bold text-highlight">
                            {domain.marketing.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="hidden px-5 py-4 text-gray-500 sm:table-cell">
                      {category}
                    </td>
                    <td className="px-5 py-4 font-medium text-white">
                      {domain.pricing.registration
                        ? formatZAR(domain.pricing.registration)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-400">
                      {domain.pricing.transfer
                        ? formatZAR(domain.pricing.transfer)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-400">
                      {domain.pricing.renewal
                        ? formatZAR(domain.pricing.renewal)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/domains?tld=${encodeURIComponent(domain.slug)}`}
                        className="text-[12px] font-semibold text-highlight hover:text-highlight/80"
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

        <div className="mt-10 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2">
          <div className="lh-card p-5">
            <h3 className="text-[14px] font-semibold text-white">
              Transfer to Legacy Hosting
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-gray-400">
              Move DNS under the same account as your web hosting and Cloud VPS.
              Auth code required for most TLDs.
            </p>
          </div>
          <div className="lh-card p-5">
            <h3 className="text-[14px] font-semibold text-white">Included</h3>
            <ul className="mt-2 space-y-1.5 text-[13px] text-gray-400">
              <li>✓ DNS management</li>
              <li>✓ Renewal reminders</li>
              <li>✓ One portal with hosting and VPS</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
