import { PageHeader } from "../../../components/PageHeader";

export const metadata = {
  title: "Abuse policy",
  description: "Legacy Hosting acceptable use and abuse reporting.",
};

export default function AbusePage() {
  return (
    <main>
      <PageHeader
        badge="Legal"
        title="Abuse"
        highlight="policy"
        description="Acceptable use and how to report abuse on Legacy Hosting infrastructure."
        breadcrumb={[
          { label: "Legal", href: "/legal/abuse" },
          { label: "Abuse" },
        ]}
      />
      <section className="py-12">
        <div className="lh-container max-w-3xl text-gray-400 leading-relaxed">
          <p>
            Services may not be used for spam, malware, unauthorized scanning,
            phishing or other unlawful activity. Reports of abuse will be
            investigated; accounts may be suspended to protect the network and
            other customers.
          </p>
          <p className="mt-4">
            Reporting channel and full AUP text will be published before
            production launch.
          </p>
        </div>
      </section>
    </main>
  );
}
