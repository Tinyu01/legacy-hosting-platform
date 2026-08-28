import Link from "next/link";
import { formatZAR, getActiveDomainProducts } from "../../lib/catalog";

export const metadata = {
  title: "Domains",
  description:
    "Register, transfer and renew domains with ZAR pricing. .co.za, .com and more.",
};

export default function DomainsPage() {
  const domains = getActiveDomainProducts();

  return (
    <main>
      <section className="border-b border-[#1c2129]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="lh-section-label">Domains</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Find and register your domain
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#8b93a1]">
            Search availability, register or transfer. DNS management included.
            Billed in ZAR.
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
              Search
            </button>
          </form>
          <p className="mt-3 text-[12px] text-[#5c6573]">
            Availability is confirmed at checkout when the registrar adapter is
            connected.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[15px] font-semibold text-white">TLD pricing</h2>
          <p className="text-[12px] text-[#5c6573]">
            Registration · transfer · renewal — per year
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#2a303c]">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-[#2a303c] bg-[#11141a] text-[11px] uppercase tracking-wider text-[#5c6573]">
              <tr>
                <th className="px-5 py-3.5 font-medium">TLD</th>
                <th className="px-5 py-3.5 font-medium">Register</th>
                <th className="px-5 py-3.5 font-medium">Transfer</th>
                <th className="px-5 py-3.5 font-medium">Renew</th>
                <th className="px-5 py-3.5 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2129]">
              {domains.map((domain) => (
                <tr
                  key={domain.id}
                  className="bg-[#0a0c10] transition hover:bg-[#11141a]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {domain.tld ?? domain.name}
                      </span>
                      {domain.marketing?.badge && (
                        <span className="rounded bg-blue-600/15 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400">
                          {domain.marketing.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#8b93a1]">
                    {domain.pricing.registration
                      ? formatZAR(domain.pricing.registration)
                      : "—"}
                  </td>
                  <td className="px-5 py-4 text-[#8b93a1]">
                    {domain.pricing.transfer
                      ? formatZAR(domain.pricing.transfer)
                      : "—"}
                  </td>
                  <td className="px-5 py-4 text-[#8b93a1]">
                    {domain.pricing.renewal
                      ? formatZAR(domain.pricing.renewal)
                      : "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/domains?tld=${encodeURIComponent(domain.slug)}`}
                      className="text-[12px] font-semibold text-blue-400 hover:text-blue-300"
                    >
                      Register
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 border-t border-[#1c2129] pt-10 sm:grid-cols-2">
          <div>
            <h3 className="text-[14px] font-semibold text-white">
              Transfer to Legacy Hosting
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#8b93a1]">
              Keep your domain name and move DNS under one account with your
              hosting and VPS. Auth code required for most TLDs.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-white">
              What is included
            </h3>
            <ul className="mt-2 space-y-1.5 text-[13px] text-[#8b93a1]">
              <li>DNS management</li>
              <li>Renewal reminders</li>
              <li>Same portal as hosting and Cloud VPS</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
