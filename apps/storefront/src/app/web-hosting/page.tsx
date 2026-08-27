import { formatZAR } from "@legacy-hosting/catalog";
import { getActiveWebHostingProducts } from "../../lib/catalog";

export const metadata = {
  title: "Web Hosting",
  description:
    "Reliable web hosting with NVMe storage, free SSL and ZAR billing.",
};

export default function WebHostingPage() {
  const plans = getActiveWebHostingProducts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-sky-400">
            Web Hosting
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Launch your website
          </h1>
          <p className="mx-auto max-w-xl text-slate-400">
            Fast NVMe hosting with free SSL, email and daily backups. Simple
            pricing in ZAR.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`flex flex-col rounded-2xl border p-6 ${
                plan.marketing?.featured
                  ? "border-sky-500/60 bg-slate-900"
                  : "border-slate-800 bg-slate-900/40"
              }`}
            >
              {plan.marketing?.badge && (
                <span className="mb-3 w-fit rounded-full bg-sky-500/10 px-3 py-0.5 text-xs font-medium text-sky-400">
                  {plan.marketing.badge}
                </span>
              )}

              <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
              <p className="mt-1 text-sm text-slate-400">{plan.description}</p>

              <div className="my-6">
                <span className="text-3xl font-bold text-white">
                  {plan.pricing.monthly
                    ? formatZAR(plan.pricing.monthly)
                    : "—"}
                </span>
                <span className="text-slate-400"> / month</span>
              </div>

              <ul className="mb-8 flex-1 space-y-2 text-sm text-slate-300">
                {plan.resources?.storageGB && (
                  <li className="flex justify-between">
                    <span>Storage</span>
                    <span className="font-medium text-white">
                      {plan.resources.storageGB} GB
                    </span>
                  </li>
                )}
                {plan.resources?.websites && (
                  <li className="flex justify-between">
                    <span>Websites</span>
                    <span className="font-medium text-white">
                      {plan.resources.websites}
                    </span>
                  </li>
                )}
                {plan.resources?.databases && (
                  <li className="flex justify-between">
                    <span>Databases</span>
                    <span className="font-medium text-white">
                      {plan.resources.databases}
                    </span>
                  </li>
                )}
                {plan.resources?.mailboxes && (
                  <li className="flex justify-between">
                    <span>Mailboxes</span>
                    <span className="font-medium text-white">
                      {plan.resources.mailboxes}
                    </span>
                  </li>
                )}
              </ul>

              <a
                href={`/web-hosting/${plan.slug}`}
                className="block rounded-lg bg-sky-500 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Get Started
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        <a href="/" className="hover:text-sky-400">
          ← Back to home
        </a>
      </footer>
    </main>
  );
}
