import { notFound } from "next/navigation";
import { getCatalog, formatZAR } from "../../../lib/catalog";
import { ConfigureVpsForm } from "../../../components/ConfigureVpsForm";
import { PageHeader } from "../../../components/PageHeader";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const catalog = getCatalog();
  const plan = catalog.products.find(
    (p) => p.slug === slug && p.category === "cloud-vps" && p.status === "active"
  );
  if (!plan) return { title: "VPS not found" };
  return {
    title: `Configure ${plan.name}`,
    description: plan.description,
  };
}

export default async function ConfigureVpsPage({ params }: Props) {
  const { slug } = await params;
  const catalog = getCatalog();

  const plan = catalog.products.find(
    (p) => p.slug === slug && p.category === "cloud-vps" && p.status === "active"
  );
  if (!plan) notFound();

  const locations =
    catalog.locations?.filter(
      (l) =>
        (plan.availableLocations ?? []).includes(l.id) && l.status === "active"
    ) ?? [];

  const operatingSystems =
    catalog.operatingSystems?.filter(
      (os) =>
        (plan.operatingSystems ?? []).includes(os.id) && os.status === "active"
    ) ?? [];

  const addons =
    catalog.addons?.filter(
      (a) =>
        a.status === "active" &&
        (a.compatibleCategories ?? []).includes("cloud-vps")
    ) ?? [];

  const res = plan.resources as
    | {
        vcpu?: number;
        ramGB?: number;
        storage?: { sizeGB: number; type: string };
        traffic?: { includedTB: number };
      }
    | undefined;

  const deployment = plan.deployment as
    | { instant?: boolean; estimatedMinutes?: number }
    | undefined;

  const from =
    plan.pricing.monthly != null ? `${formatZAR(plan.pricing.monthly)}/mo` : "—";

  return (
    <main>
      <PageHeader
        badge="Configure"
        title={plan.name}
        highlight="setup"
        description={plan.description}
        breadcrumb={[
          { label: "Cloud VPS", href: "/cloud-vps" },
          { label: plan.name },
        ]}
        cta={{ text: "Choose options", href: "#configure" }}
        ctaSecondary={{ text: "All plans", href: "/cloud-vps" }}
      >
        <dl className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
          <div>
            <span className="text-white/40">vCPU </span>
            <span className="font-medium text-white">{res?.vcpu ?? "—"}</span>
          </div>
          <div>
            <span className="text-white/40">RAM </span>
            <span className="font-medium text-white">
              {res?.ramGB ? `${res.ramGB} GB` : "—"}
            </span>
          </div>
          <div>
            <span className="text-white/40">Storage </span>
            <span className="font-medium text-white">
              {res?.storage
                ? `${res.storage.sizeGB} GB ${res.storage.type}`
                : "—"}
            </span>
          </div>
          <div>
            <span className="text-white/40">From </span>
            <span className="font-medium text-highlight">{from}</span>
          </div>
        </dl>
      </PageHeader>

      <section id="configure" className="py-12 md:py-16">
        <div className="lh-container">
          <ConfigureVpsForm
            productSlug={plan.slug}
            productName={plan.name}
            monthly={plan.pricing.monthly ?? 0}
            annual={plan.pricing.annual}
            locations={locations.map((l) => ({
              id: l.id,
              name: l.name,
              country: l.country ?? "",
            }))}
            operatingSystems={operatingSystems.map((os) => ({
              id: os.id,
              name: os.name,
              version: os.version,
            }))}
            addons={addons.map((a) => ({
              id: a.id,
              name: a.name,
              description: (a as { description?: string }).description,
              monthly: a.pricing.monthly ?? 0,
            }))}
            instant={deployment?.instant}
            estimatedMinutes={deployment?.estimatedMinutes}
          />
        </div>
      </section>
    </main>
  );
}
