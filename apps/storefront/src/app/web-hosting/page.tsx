import Link from "next/link";
import { formatZAR, getActiveWebHostingProducts } from "../../lib/catalog";

export const metadata = {
  title: "Web Hosting",
  description:
    "Shared and Managed WordPress hosting with NVMe storage, SSL and ZAR billing.",
};

export default function WebHostingPage() {
  const plans = getActiveWebHostingProducts();

  return (
    <main>
      <section className="border-b border-[#1c2129]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="lh-section-label">Web Hosting</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Hosting for sites that need to stay up
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#8b93a1]">
            Shared hosting and Managed WordPress. SSL, email and backups
            included. Priced in ZAR.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-[#2a303c]">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-[#2a303c] bg-[#11141a] text-[11px] uppercase tracking-wider text-[#5c6573]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Plan</th>
                <th className="hidden px-5 py-3.5 font-medium sm:table-cell">
                  Storage
                </th>
                <th className="hidden px-5 py-3.5 font-medium md:table-cell">
                  Sites
                </th>
                <th className="hidden px-5 py-3.5 font-medium md:table-cell">
                  Email
                </th>
                <th className="px-5 py-3.5 font-medium">Monthly</th>
                <th className="hidden px-5 py-3.5 font-medium lg:table-cell">
                  Annual
                </th>
                <th className="px-5 py-3.5 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2129]">
              {plans.map((plan) => {
                const res = plan.resources as {
                  storageGB?: number;
                  websites?: number;
                  mailboxes?: number;
                  databases?: number;
                } | undefined;
                return (
                  <tr
                    key={plan.id}
                    className="bg-[#0a0c10] transition hover:bg-[#11141a]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-white">
                          {plan.name}
                        </span>
                        {plan.marketing?.badge && (
                          <span className="w-fit rounded bg-blue-600/15 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400">
                            {plan.marketing.badge}
                          </span>
                        )}
                        <span className="text-[12px] text-[#5c6573] line-clamp-1 sm:hidden">
                          {plan.description}
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-5 py-4 text-[#8b93a1] sm:table-cell">
                      {res?.storageGB ? `${res.storageGB} GB` : "—"}
                    </td>
                    <td className="hidden px-5 py-4 text-[#8b93a1] md:table-cell">
                      {res?.websites ?? "—"}
                    </td>
                    <td className="hidden px-5 py-4 text-[#8b93a1] md:table-cell">
                      {res?.mailboxes ?? "—"}
                    </td>
                    <td className="px-5 py-4 font-medium text-white">
                      {plan.pricing.monthly
                        ? formatZAR(plan.pricing.monthly)
                        : "—"}
                    </td>
                    <td className="hidden px-5 py-4 text-[#8b93a1] lg:table-cell">
                      {plan.pricing.annual
                        ? formatZAR(plan.pricing.annual)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/web-hosting/${plan.slug}`}
                        className="inline-flex rounded-md bg-blue-600 px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-blue-500"
                      >
                        Select
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-8 border-t border-[#1c2129] pt-10 sm:grid-cols-3">
          <div>
            <h3 className="text-[14px] font-semibold text-white">
              Starter → Business
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#8b93a1]">
              Start small. Move up when you need more sites, storage or
              mailboxes — same account.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-white">
              Managed WordPress
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#8b93a1]">
              For sites that need automatic updates, staging and stronger
              defaults.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-white">
              Need more control?
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#8b93a1]">
              <Link href="/cloud-vps" className="text-blue-400 hover:text-blue-300">
                Cloud VPS
              </Link>{" "}
              gives you root access, snapshots and full stack choice.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
