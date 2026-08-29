import Link from "next/link";
import { formatZAR, getActiveWebHostingProducts } from "../../lib/catalog";
import { PageHeader } from "../../components/PageHeader";
import { FinalCTA } from "../../components/FinalCTA";
import { HostingPlanCard } from "../../components/HostingPlanCard";

export const metadata = {
  title: "Web Hosting",
  description:
    "Shared and Managed WordPress hosting with NVMe storage, SSL and ZAR billing.",
};

export default function WebHostingPage() {
  const plans = getActiveWebHostingProducts();
  const fromPrice = plans[0]?.pricing.monthly
    ? formatZAR(plans[0].pricing.monthly)
    : "R79";

  return (
    <main>
      <PageHeader
        badge="Web Hosting"
        title="Hosting for sites"
        highlight="that need to stay up"
        description={`Shared hosting and Managed WordPress from ${fromPrice}/mo. SSL, email and backups included. Priced in ZAR.`}
        breadcrumb={[{ label: "Web Hosting" }]}
        cta={{ text: "Compare plans", href: "#plans" }}
        ctaSecondary={{ text: "Cloud VPS", href: "/cloud-vps" }}
        stats={[
          { value: String(plans.length), label: "Plans" },
          { value: "SSL", label: "Included" },
          { value: "NVMe", label: "Storage" },
          { value: "ZAR", label: "Billing" },
        ]}
      />

      <section
        id="plans"
        className="border-b border-white/5 bg-gradient-to-b from-primary via-primary/95 to-soft/20 py-16 md:py-24"
      >
        <div className="lh-container">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              Plans
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Choose your{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                hosting
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <HostingPlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="mt-14 grid gap-6 border-t border-white/10 pt-12 sm:grid-cols-3">
            {[
              {
                t: "Starter → Business",
                b: "Start small. Move up when you need more sites, storage or mailboxes — same account.",
              },
              {
                t: "Managed WordPress",
                b: "For sites that need automatic updates, staging and stronger defaults.",
              },
              {
                t: "Need more control?",
                b: (
                  <>
                    <Link
                      href="/cloud-vps"
                      className="font-semibold text-highlight hover:underline"
                    >
                      Cloud VPS
                    </Link>{" "}
                    gives you root access, snapshots and full stack choice.
                  </>
                ),
              },
            ].map((block) => (
              <div
                key={block.t}
                className="rounded-2xl border border-white/10 bg-surface/50 p-6"
              >
                <h3 className="text-base font-semibold text-white">{block.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {block.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
