import { PageHeader } from "../../../components/PageHeader";

export const metadata = {
  title: "Terms of service",
  description: "Legacy Hosting terms of service.",
};

export default function TermsPage() {
  return (
    <main>
      <PageHeader
        badge="Legal"
        title="Terms of"
        highlight="service"
        description="Summary placeholder. Final legal text will be reviewed before production launch."
        breadcrumb={[
          { label: "Legal", href: "/legal/terms" },
          { label: "Terms" },
        ]}
      />
      <section className="py-12">
        <div className="lh-container prose prose-invert max-w-3xl text-gray-400">
          <p>
            By using Legacy Hosting services you agree to the commercial terms
            applicable to domains, hosting and cloud products, including acceptable
            use, billing cycles in ZAR, and suspension policies for non-payment.
          </p>
          <p className="mt-4">
            This page is a structural stub for the storefront. Replace with
            counsel-approved terms before accepting paid orders in production.
          </p>
        </div>
      </section>
    </main>
  );
}
