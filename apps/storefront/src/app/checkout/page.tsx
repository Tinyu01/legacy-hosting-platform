import { Suspense } from "react";
import { CheckoutClient } from "./CheckoutClient";

export const metadata = {
  title: "Checkout",
  description: "Review your Legacy Hosting order and proceed to payment.",
};

export default function CheckoutPage() {
  return (
    <main>
      <section className="border-b border-[#1c2129]">
        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
          <p className="lh-section-label">Checkout</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Review your order
          </h1>
          <p className="mt-2 text-[14px] text-[#8b93a1]">
            Confirm configuration and total. Payment connects to FOSSBilling in
            the next phase.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <p className="text-[13px] text-[#8b93a1]">Loading quote…</p>
          }
        >
          <CheckoutClient />
        </Suspense>
      </section>
    </main>
  );
}
