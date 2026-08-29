import { Suspense } from "react";
import { CheckoutClient } from "./CheckoutClient";
import { PageHeader } from "../../components/PageHeader";

export const metadata = {
  title: "Checkout",
  description: "Review your Legacy Hosting order and proceed to payment.",
};

export default function CheckoutPage() {
  return (
    <main>
      <PageHeader
        badge="Checkout"
        title="Review your"
        highlight="order"
        description="Confirm configuration and total. Payment connects to FOSSBilling in the next phase."
        breadcrumb={[{ label: "Checkout" }]}
      />

      <section className="py-12 md:py-16">
        <div className="lh-container max-w-5xl">
          <Suspense
            fallback={
              <p className="text-sm text-gray-400">Loading quote…</p>
            }
          >
            <CheckoutClient />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
