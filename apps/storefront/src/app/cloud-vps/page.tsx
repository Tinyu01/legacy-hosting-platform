import { formatZAR, getActiveVpsProducts } from "../../lib/catalog";
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
  const fromPrice = plans[0]?.pricing.monthly
    ? formatZAR(plans[0].pricing.monthly)
    : "R199";

  return (
    <main>
      <PageHeader
        badge="Cloud VPS"
        title="Cloud servers"
        highlight="priced for operators"
        description={`Scalable virtual servers with root access, NVMe storage and snapshots. From ${fromPrice}/mo — configure location, OS and add-ons. Billed in ZAR.`}
        breadcrumb={[{ label: "Cloud VPS" }]}
        cta={{ text: "Compare plans", href: "#plans" }}
        ctaSecondary={{ text: "Search domain", href: "/domains" }}
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
                plan
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Clear specs. No supplier branding. Get Started opens configure.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <VpsPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
