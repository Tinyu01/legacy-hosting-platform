const steps = [
  {
    n: "01",
    title: "Choose a product",
    body: "Domain, web hosting or Cloud VPS — clear specs and ZAR prices from the catalogue.",
  },
  {
    n: "02",
    title: "Configure",
    body: "Location, OS, billing period and add-ons. Live total before you continue.",
  },
  {
    n: "03",
    title: "Checkout",
    body: "Quote from the Legacy Hosting API. Payment and provisioning in the next phase.",
  },
  {
    n: "04",
    title: "Manage",
    body: "One client portal for domains, hosting and servers as the platform expands.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-white/10 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <span className="text-[12px] font-bold uppercase tracking-wider text-accent">
              How it works
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            From catalogue to{" "}
            <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
              running workload
            </span>
          </h2>
          <p className="mt-3 text-[15px] text-gray-400">
            A simple path designed for operators — not a maze of reseller panels.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="lh-card p-5">
              <p className="text-[13px] font-black text-highlight">{s.n}</p>
              <h3 className="mt-2 text-[15px] font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-gray-400">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
