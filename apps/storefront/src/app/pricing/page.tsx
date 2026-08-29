import Link from "next/link";
import {
  formatZAR,
  getActiveDomainProducts,
  getActiveVpsProducts,
  getActiveWebHostingProducts,
  getCatalog,
} from "../../lib/catalog";
import { PageHeader } from "../../components/PageHeader";
import { FinalCTA } from "../../components/FinalCTA";

export const metadata = {
  title: "Pricing",
  description:
    "Clear ZAR pricing for domains, web hosting and Cloud VPS. No hidden fees.",
};

type ResourceShape = {
  vcpu?: number;
  ramGB?: number;
  storage?: { sizeGB: number; type: string };
  traffic?: { includedTB: number };
  storageGB?: number;
  websites?: number;
  databases?: number;
  mailboxes?: number;
};

function SectionTitle({
  id,
  title,
  description,
  moreHref,
}: {
  id: string;
  title: string;
  description: string;
  moreHref: string;
}) {
  return (
    <div id={id} className="mb-5 scroll-mt-28">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-400">{description}</p>
        </div>
        <Link
          href={moreHref}
          className="text-sm font-semibold text-highlight hover:underline"
        >
          More details →
        </Link>
      </div>
    </div>
  );
}

function PricingTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface/40 shadow-xl">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-white/10 bg-white/5 text-[11px] uppercase tracking-wider text-white/50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3.5 font-medium whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">{children}</tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  const vps = getActiveVpsProducts();
  const hosting = getActiveWebHostingProducts();
  const domains = getActiveDomainProducts();
  const addons =
    getCatalog().addons?.filter((a) => a.status === "active") ?? [];

  return (
    <main>
      <PageHeader
        badge="Pricing"
        title="A simple price structure"
        highlight="for great products"
        description="All prices in South African Rand. Catalogue-driven — what you see is what we sell. VAT shown where noted."
        breadcrumb={[{ label: "Pricing" }]}
        cta={{ text: "Cloud VPS", href: "#cloud-vps" }}
        ctaSecondary={{ text: "Domains", href: "#domains" }}
      />

      {/* Jump links */}
      <div className="border-b border-white/5 bg-surface/30">
        <div className="lh-container flex flex-wrap gap-2 py-3 text-sm">
          {[
            { href: "#cloud-vps", label: "Cloud VPS" },
            { href: "#web-hosting", label: "Web Hosting" },
            { href: "#domains", label: "Domains" },
            { href: "#addons", label: "Add-ons" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-medium text-gray-300 transition hover:border-highlight/40 hover:text-highlight"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-16 py-12 md:py-16">
        {/* —— Cloud VPS —— */}
        <section className="lh-container">
          <SectionTitle
            id="cloud-vps"
            title="Cloud VPS"
            description="Virtual private servers with root access, NVMe storage and snapshots. Deploy in minutes."
            moreHref="/cloud-vps"
          />
          <PricingTable
            headers={[
              "Model",
              "CPU",
              "RAM",
              "Storage",
              "Transfer",
              "Price / month",
              "",
            ]}
          >
            {vps.map((plan) => {
              const r = plan.resources as ResourceShape | undefined;
              const badge = (plan.marketing as { badge?: string } | undefined)
                ?.badge;
              return (
                <tr key={plan.id} className="transition hover:bg-white/5">
                  <td className="px-4 py-4">
                    <span className="font-semibold text-white">{plan.name}</span>
                    {badge && (
                      <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
                        {badge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    {r?.vcpu != null ? `${r.vcpu} vCPU` : "—"}
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    {r?.ramGB != null ? `${r.ramGB} GB` : "—"}
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    {r?.storage
                      ? `${r.storage.sizeGB} GB ${r.storage.type}`
                      : "—"}
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    {r?.traffic?.includedTB != null
                      ? `${r.traffic.includedTB} TB`
                      : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold tabular-nums text-white">
                      {plan.pricing.monthly
                        ? formatZAR(plan.pricing.monthly)
                        : "—"}
                    </span>
                    <span className="block text-[11px] text-white/40">
                      excl. VAT ·{" "}
                      {plan.pricing.annual
                        ? `${formatZAR(plan.pricing.annual)}/yr`
                        : ""}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link
                      href={`/cloud-vps/${plan.slug}`}
                      className="inline-flex rounded-lg bg-gradient-to-r from-highlight to-accent px-3.5 py-2 text-xs font-semibold text-white transition hover:scale-[1.02]"
                    >
                      Get Started
                    </Link>
                  </td>
                </tr>
              );
            })}
          </PricingTable>
          <p className="mt-3 text-xs text-white/40">
            Monthly billing by default. Annual options available at configure.
            Fair-use transfer applies to keep the network stable for everyone.
          </p>
        </section>

        {/* —— Web Hosting —— */}
        <section className="lh-container">
          <SectionTitle
            id="web-hosting"
            title="Web Hosting"
            description="Shared and Managed WordPress hosting with SSL, email and backups."
            moreHref="/web-hosting"
          />
          <PricingTable
            headers={[
              "Plan",
              "Websites",
              "Storage",
              "Mailboxes",
              "Databases",
              "Price / month",
              "",
            ]}
          >
            {hosting.map((plan) => {
              const r = plan.resources as ResourceShape | undefined;
              const badge = (plan.marketing as { badge?: string } | undefined)
                ?.badge;
              return (
                <tr key={plan.id} className="transition hover:bg-white/5">
                  <td className="px-4 py-4">
                    <span className="font-semibold text-white">{plan.name}</span>
                    {badge && (
                      <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
                        {badge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    {r?.websites ?? "—"}
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    {r?.storageGB != null ? `${r.storageGB} GB NVMe` : "—"}
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    {r?.mailboxes ?? "—"}
                  </td>
                  <td className="px-4 py-4 text-gray-300">
                    {r?.databases ?? "—"}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold tabular-nums text-white">
                      {plan.pricing.monthly
                        ? formatZAR(plan.pricing.monthly)
                        : "—"}
                    </span>
                    <span className="block text-[11px] text-white/40">
                      excl. VAT ·{" "}
                      {plan.pricing.annual
                        ? `${formatZAR(plan.pricing.annual)}/yr`
                        : ""}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link
                      href="/web-hosting"
                      className="inline-flex rounded-lg bg-gradient-to-r from-highlight to-accent px-3.5 py-2 text-xs font-semibold text-white transition hover:scale-[1.02]"
                    >
                      Get Started
                    </Link>
                  </td>
                </tr>
              );
            })}
          </PricingTable>
        </section>

        {/* —— Domains —— */}
        <section className="lh-container">
          <SectionTitle
            id="domains"
            title="Domains"
            description="Register, transfer and renew. DNS management included."
            moreHref="/domains"
          />
          <PricingTable
            headers={[
              "Extension",
              "Register",
              "Transfer",
              "Renewal",
              "Billing",
              "",
            ]}
          >
            {domains.map((d) => (
              <tr key={d.id} className="transition hover:bg-white/5">
                <td className="px-4 py-4 font-semibold text-white">
                  {d.tld ?? d.name}
                </td>
                <td className="px-4 py-4 tabular-nums text-gray-300">
                  {d.pricing.registration
                    ? formatZAR(d.pricing.registration)
                    : "—"}
                </td>
                <td className="px-4 py-4 tabular-nums text-gray-300">
                  {d.pricing.transfer ? formatZAR(d.pricing.transfer) : "—"}
                </td>
                <td className="px-4 py-4 tabular-nums text-gray-300">
                  {d.pricing.renewal ? formatZAR(d.pricing.renewal) : "—"}
                </td>
                <td className="px-4 py-4 text-gray-400">per year</td>
                <td className="px-4 py-4 text-right">
                  <Link
                    href={`/domains?tld=${encodeURIComponent(d.slug)}`}
                    className="inline-flex rounded-lg bg-gradient-to-r from-highlight to-accent px-3.5 py-2 text-xs font-semibold text-white transition hover:scale-[1.02]"
                  >
                    Get Started
                  </Link>
                </td>
              </tr>
            ))}
          </PricingTable>
        </section>

        {/* —— Add-ons —— */}
        {addons.length > 0 && (
          <section className="lh-container">
            <SectionTitle
              id="addons"
              title="Add-ons"
              description="Optional services for Cloud VPS and infrastructure."
              moreHref="/cloud-vps"
            />
            <PricingTable headers={["Add-on", "Description", "Price / month", ""]}>
              {addons.map((a) => (
                <tr key={a.id} className="transition hover:bg-white/5">
                  <td className="px-4 py-4 font-semibold text-white">{a.name}</td>
                  <td className="max-w-md px-4 py-4 text-gray-400">
                    {(a as { description?: string }).description ?? "—"}
                  </td>
                  <td className="px-4 py-4 tabular-nums text-white">
                    {a.pricing.monthly
                      ? formatZAR(a.pricing.monthly)
                      : "—"}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link
                      href="/cloud-vps"
                      className="text-sm font-semibold text-highlight hover:underline"
                    >
                      With VPS →
                    </Link>
                  </td>
                </tr>
              ))}
            </PricingTable>
          </section>
        )}

        {/* Fair use note — Contabo-style, provider-invisible */}
        <section className="lh-container">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-gray-400">
            <p className="font-semibold text-white/80">Traffic & fair use</p>
            <p className="mt-2">
              Incoming traffic is unmetered. Transfer allowances on Cloud VPS
              are sized for typical server workloads. Exceptionally high or
              disruptive usage may be limited so the network stays fair for all
              customers. Measures like this are rare and only applied when
              needed.
            </p>
            <p className="mt-3">
              Dedicated servers and extra product lines will appear here as they
              leave draft in the catalogue — same tables, same ZAR billing.
            </p>
          </div>
        </section>
      </div>

      <FinalCTA />
    </main>
  );
}
