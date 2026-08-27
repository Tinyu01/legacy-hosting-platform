import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-sky-400">
            Legacy Hosting
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Infrastructure built for{" "}
            <span className="text-sky-400">your next move</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
            Domains, web hosting, cloud VPS and dedicated infrastructure —
            managed from one platform. ZAR billing. South African support.
          </p>

          {/* Domain search teaser */}
          <form
            action="/domains"
            className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              name="q"
              placeholder="yourbusiness.co.za"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Search Domain
            </button>
          </form>
        </div>
      </section>

      {/* Product categories */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-2xl font-semibold text-white">
          Choose your infrastructure
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Domains",
              description: "Register & transfer",
              href: "/domains",
            },
            {
              title: "Web Hosting",
              description: "Launch your website",
              href: "/web-hosting",
            },
            {
              title: "Cloud VPS",
              description: "Deploy your server",
              href: "/cloud-vps",
            },
            {
              title: "Dedicated",
              description: "Coming soon",
              href: "/cloud-vps",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-sky-500/50 hover:bg-slate-900"
            >
              <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-sky-400">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-t border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center text-2xl font-semibold text-white">
            Why Legacy Hosting?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "ZAR Billing",
              "South African Support",
              "Cloud + Local Infrastructure",
              "Automated Provisioning",
              "Managed Services",
              "Transparent Pricing",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-slate-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
