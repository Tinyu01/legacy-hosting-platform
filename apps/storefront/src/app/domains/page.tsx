import { formatZAR } from "@legacy-hosting/catalog";
import { getActiveDomainProducts } from "../../lib/catalog";

export const metadata = {
  title: "Domains",
  description:
    "Register, transfer and manage .co.za, .com and other domains with Legacy Hosting.",
};

export default function DomainsPage() {
  const domains = getActiveDomainProducts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-sky-400">
            Domains
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Find your perfect domain
          </h1>
          <p className="mx-auto max-w-xl text-slate-400">
            Register, transfer and manage domains with ZAR pricing and local
            support.
          </p>

          {/* Search */}
          <form className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="domain"
              placeholder="yourbusiness.co.za"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Search
            </button>
          </form>
          <p className="mt-3 text-xs text-slate-500">
            Domain availability check will be connected to the registrar adapter
            in Phase 2.
          </p>
        </div>
      </section>

      {/* TLD Pricing Table */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-xl font-semibold">Domain pricing</h2>

        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">TLD</th>
                <th className="px-6 py-4 font-medium">Register</th>
                <th className="px-6 py-4 font-medium">Transfer</th>
                <th className="px-6 py-4 font-medium">Renew</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {domains.map((domain) => (
                <tr
                  key={domain.id}
                  className="bg-slate-950/50 transition hover:bg-slate-900/80"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{domain.name}</div>
                    {domain.marketing?.badge && (
                      <span className="mt-1 inline-block rounded bg-sky-500/10 px-2 py-0.5 text-xs text-sky-400">
                        {domain.marketing.badge}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {domain.pricing.registration
                      ? `${formatZAR(domain.pricing.registration)} / yr`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {domain.pricing.transfer
                      ? `${formatZAR(domain.pricing.transfer)} / yr`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {domain.pricing.renewal
                      ? `${formatZAR(domain.pricing.renewal)} / yr`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`/domains/${domain.slug}`}
                      className="text-sm font-medium text-sky-400 hover:text-sky-300"
                    >
                      Register →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {domains.length === 0 && (
          <p className="mt-6 text-center text-slate-500">
            No domain products are currently active in the catalogue.
          </p>
        )}
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        <a href="/" className="hover:text-sky-400">
          ← Back to home
        </a>
      </footer>
    </main>
  );
}
