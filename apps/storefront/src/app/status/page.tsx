import { PageHeader } from "../../components/PageHeader";

export const metadata = {
  title: "Server status",
  description: "Legacy Hosting platform and service status.",
};

const systems = [
  { name: "Storefront", status: "Operational" },
  { name: "API", status: "Operational" },
  { name: "Domain registration", status: "Operational" },
  { name: "Cloud VPS provisioning", status: "Operational" },
  { name: "Client portal", status: "Planned" },
  { name: "Billing (FOSSBilling)", status: "Planned" },
];

export default function StatusPage() {
  return (
    <main>
      <PageHeader
        badge="Status"
        title="Platform"
        highlight="status"
        description="High-level view of Legacy Hosting services. Live incident feeds wire in later."
        breadcrumb={[{ label: "Status" }]}
      />

      <section className="py-12 md:py-16">
        <div className="lh-container max-w-2xl">
          <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
            {systems.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between bg-surface/40 px-5 py-4"
              >
                <span className="font-medium text-white">{s.name}</span>
                <span
                  className={`text-sm font-semibold ${
                    s.status === "Operational"
                      ? "text-highlight"
                      : "text-white/40"
                  }`}
                >
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-gray-400">
            For urgent issues contact support via the client portal once live, or{" "}
            <a
              href="https://tech.malenglegacy.co.za"
              className="text-highlight hover:underline"
            >
              Maleng Legacy Tech
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
