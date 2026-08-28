import Link from "next/link";
import { formatZAR, getActiveVpsProducts } from "../../lib/catalog";

export const metadata = {
  title: "Cloud VPS",
  description:
    "Virtual servers with NVMe storage, root access and ZAR billing. Deploy in minutes.",
};

export default function CloudVpsPage() {
  const plans = getActiveVpsProducts();

  return (
    <main>
      <section className="border-b border-[#1c2129]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="lh-section-label">Cloud VPS</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Virtual servers
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#8b93a1]">
            NVMe storage, public IPv4, snapshots and full root access. Deploy
            in minutes. Billed in ZAR — monthly or annually.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-[#2a303c]">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-[#2a303c] bg-[#11141a] text-[11px] uppercase tracking-wider text-[#5c6573]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Plan</th>
                <th className="hidden px-5 py-3.5 font-medium md:table-cell">
                  vCPU
                </th>
                <th className="hidden px-5 py-3.5 font-medium md:table-cell">
                  RAM
                </th>
                <th className="hidden px-5 py-3.5 font-medium lg:table-cell">
                  Storage
                </th>
                <th className="hidden px-5 py-3.5 font-medium lg:table-cell">
                  Traffic
                </th>
                <th className="px-5 py-3.5 font-medium">Monthly</th>
                <th className="px-5 py-3.5 font-medium">Annual</th>
                <th className="px-5 py-3.5 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2129]">
              {plans.map((plan) => {
                const res = plan.resources as {
                  vcpu?: number;
                  ramGB?: number;
                  storage?: { sizeGB: number; type: string };
                  traffic?: { includedTB: number };
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
                      </div>
                    </td>
                    <td className="hidden px-5 py-4 text-[#8b93a1] md:table-cell">
                      {res?.vcpu ?? "—"}
                    </td>
                    <td className="hidden px-5 py-4 text-[#8b93a1] md:table-cell">
                      {res?.ramGB ? `${res.ramGB} GB` : "—"}
                    </td>
                    <td className="hidden px-5 py-4 text-[#8b93a1] lg:table-cell">
                      {res?.storage
                        ? `${res.storage.sizeGB} GB ${res.storage.type}`
                        : "—"}
                    </td>
                    <td className="hidden px-5 py-4 text-[#8b93a1] lg:table-cell">
                      {res?.traffic ? `${res.traffic.includedTB} TB` : "—"}
                    </td>
                    <td className="px-5 py-4 font-medium text-white">
                      {plan.pricing.monthly
                        ? formatZAR(plan.pricing.monthly)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-[#8b93a1]">
                      {plan.pricing.annual
                        ? formatZAR(plan.pricing.annual)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/cloud-vps/${plan.slug}`}
                        className="inline-flex rounded-md bg-blue-600 px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-blue-500"
                      >
                        Configure
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-[12px] text-[#5c6573]">
          All plans include IPv4, IPv6, snapshots, cloud firewall and metrics.
          Managed Service and daily backups available as add-ons at checkout.
        </p>
      </section>
    </main>
  );
}
