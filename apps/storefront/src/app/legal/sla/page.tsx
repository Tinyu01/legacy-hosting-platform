import { PageHeader } from "../../../components/PageHeader";

export const metadata = {
  title: "Service level agreement",
  description: "Legacy Hosting SLA overview.",
};

export default function SlaPage() {
  return (
    <main>
      <PageHeader
        badge="Legal"
        title="Service level"
        highlight="agreement"
        description="Target availability and support windows. Formal SLA text before paid SLAs are sold."
        breadcrumb={[
          { label: "Legal", href: "/legal/sla" },
          { label: "SLA" },
        ]}
      />
      <section className="py-12">
        <div className="lh-container max-w-3xl text-gray-400 leading-relaxed">
          <p>
            Network and infrastructure targets will be published per product
            class (shared hosting, Cloud VPS, dedicated). Support is oriented to
            South African business hours (SAST) with expanded coverage planned
            as the platform scales.
          </p>
        </div>
      </section>
    </main>
  );
}
