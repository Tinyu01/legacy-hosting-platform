import Link from "next/link";
import { getActiveWebHostingProducts } from "../../lib/catalog";
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

  return (
    <main>
      <PageHeader
        badge="WEB HOSTING"
        title="Hosting for sites"
        highlight="that need to stay up"
        description="Shared hosting and Managed WordPress. SSL, email and backups included. Priced in ZAR."
        breadcrumb={[{ label: "Web Hosting" }]}
        cta={{ text: "Compare plans", href: "#plans" }}
        ctaSecondary={{ text: "Cloud VPS", href: "/cloud-vps" }}
      />

      <section id="plans" className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <HostingPlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
          <div>
            <h3 className="text-[14px] font-semibold text-ink">Starter → Business</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
              Start small. Move up when you need more sites, storage or mailboxes — same account.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-ink">Managed WordPress</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
              For sites that need automatic updates, staging and stronger defaults.
            </p>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-ink">Need more control?</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
              <Link href="/cloud-vps" className="text-highlight hover:underline">
                Cloud VPS
              </Link>{" "}
              gives you root access, snapshots and full stack choice.
            </p>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
