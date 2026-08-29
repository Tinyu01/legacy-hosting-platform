import { notFound } from "next/navigation";
import { getCatalog, formatZAR } from "../../../lib/catalog";
import { ConfigureVpsForm } from "../../../components/ConfigureVpsForm";

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

  const res = plan.resources as {
    vcpu?: number;
    ramGB?: number;
    storage?: { sizeGB: number; type: string };
    traffic?: { includedTB: number };
  } | undefined;

  const deployment = plan.deployment as
    | { instant?: boolean; estimatedMinutes?: number }
    | undefined;

  return (
    <main>
      <section className="border-b border-border">
        <div className="lh-container py-10">
          <p className="lh-section-label">Configure</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {plan.name}
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] text-ink-muted">
            {plan.description}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-ink-muted">
            <div>
              <span className="text-ink-dim">vCPU </span>
              <span className="font-medium text-ink">{res?.vcpu ?? "—"}</span>
            </div>
            <div>
              <span className="text-ink-dim">RAM </span>
              <span className="font-medium text-ink">
                {res?.ramGB ? `${res.ramGB} GB` : "—"}
              </span>
            </div>
            <div>
              <span className="text-ink-dim">Storage </span>
              <span className="font-medium text-ink">
                {res?.storage
                  ? `${res.storage.sizeGB} GB ${res.storage.type}`
                  : "—"}
              </span>
            </div>
            <div>
              <span className="text-ink-dim">From </span>
              <span className="font-medium text-ink">
                {plan.pricing.monthly
                  ? `${formatZAR(plan.pricing.monthly)}/mo`
                  : "—"}
              </span>
            </div>
          </dl>
        </div>
      </section>

      <section className="lh-container py-10">
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
            description: a.description,
            monthly: a.pricing.monthly ?? 0,
          }))}
          instant={deployment?.instant}
          estimatedMinutes={deployment?.estimatedMinutes}
        />
      </section>
    </main>
  );
}
