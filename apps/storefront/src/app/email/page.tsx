import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";
import { FinalCTA } from "../../components/FinalCTA";

export const metadata = {
  title: "Email",
  description:
    "Professional business email with your domain. ZAR billing, South African support.",
};

const plans = [
  {
    name: "Mailbox",
    price: "R29",
    period: "/mailbox/mo",
    blurb: "Professional email on your domain.",
    features: ["5 GB storage", "Webmail + IMAP/POP", "Spam filtering", "Mobile sync"],
  },
  {
    name: "Business",
    price: "R59",
    period: "/mailbox/mo",
    blurb: "For teams that need more space and collaboration basics.",
    features: [
      "25 GB storage",
      "Shared calendars",
      "Aliases",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    blurb: "Archiving, compliance and managed delivery for larger organisations.",
    features: [
      "Unlimited aliases",
      "Archiving options",
      "Custom retention",
      "Dedicated onboarding",
    ],
  },
];

export default function EmailPage() {
  return (
    <main>
      <PageHeader
        badge="Email"
        title="Business email"
        highlight="on your domain"
        description="Professional mailboxes with your brand, not a free provider address. Pair with Domains and Web Hosting."
        breadcrumb={[{ label: "Email" }]}
        cta={{ text: "View plans", href: "#plans" }}
        ctaSecondary={{ text: "Register domain", href: "/domains" }}
      />

      <section id="plans" className="py-14 md:py-20">
        <div className="lh-container">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              Plans
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Choose your{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                mailbox
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-gray-400">
              Indicative ZAR pricing for v1. Final rates and checkout wire through
              the catalogue and FOSSBilling next.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  p.featured
                    ? "border-highlight/40 bg-gradient-to-b from-highlight/10 to-surface"
                    : "border-white/10 bg-surface/50"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold uppercase text-white">
                    Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-white">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{p.blurb}</p>
                <p className="mt-5">
                  <span className="text-3xl font-bold text-white">{p.price}</span>
                  <span className="text-sm text-gray-400">{p.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-gray-300">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-highlight">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/domains"
                  className="mt-8 inline-flex justify-center rounded-lg bg-gradient-to-r from-highlight to-accent px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Get started with a domain
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
