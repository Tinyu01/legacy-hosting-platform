import { PageHeader } from "../../../components/PageHeader";

export const metadata = {
  title: "Privacy policy",
  description: "Legacy Hosting privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader
        badge="Legal"
        title="Privacy"
        highlight="policy"
        description="How we handle account and billing data. Stub until final policy is published."
        breadcrumb={[
          { label: "Legal", href: "/legal/privacy" },
          { label: "Privacy" },
        ]}
      />
      <section className="py-12">
        <div className="lh-container max-w-3xl text-gray-400 leading-relaxed">
          <p>
            Legacy Hosting processes personal information required to deliver
            domains, hosting and cloud services (for example contact details,
            billing records and technical logs). Data is handled under South
            African POPIA principles where applicable.
          </p>
          <p className="mt-4">
            Replace this stub with a full privacy notice before production
            checkout goes live.
          </p>
        </div>
      </section>
    </main>
  );
}
