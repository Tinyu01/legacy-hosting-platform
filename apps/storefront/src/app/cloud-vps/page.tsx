import { getActiveVpsProducts } from "../../lib/catalog";
import { PageHeader } from "../../components/PageHeader";
import { FinalCTA } from "../../components/FinalCTA";
import { VpsPlanCard } from "../../components/VpsPlanCard";

export const metadata = {
  title: "Cloud VPS",
  description:
    "Scalable cloud VPS with NVMe storage, root access and ZAR billing.",
};

export default function CloudVpsPage() {
  const plans = getActiveVpsProducts();

  return (
    <main>
      <PageHeader
        badge="CLOUD VPS"
        title="Cloud servers"
        highlight="priced for operators"
        description="Scalable virtual servers with root access, NVMe storage and snapshots. Configure location, OS and add-ons — billed in ZAR."
        breadcrumb={[{ label: "Cloud VPS" }]}
        cta={{ text: "Compare plans", href: "#plans" }}
        ctaSecondary={{ text: "Search domain", href: "/domains" }}
      />

      <section id="plans" className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-ink">Choose your plan</h2>
          <p className="mt-2 text-[14px] text-ink-muted">
            Clear specs. No supplier branding. Get Started opens configure.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <VpsPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
