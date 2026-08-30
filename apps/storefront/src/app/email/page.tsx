import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";
import { FinalCTA } from "../../components/FinalCTA";
import {
  formatZAR,
  getActiveEmailProducts,
} from "../../lib/catalog";

export const metadata = {
  title: "Business Email | Professional Email Hosting",
  description:
    "Secure professional email on your domain. Webmail, mobile sync, spam protection. From R29/mo. ZAR billing, South African support.",
};

type EmailResources = {
  mailboxes?: number;
  storageGBPerMailbox?: number;
};

const FEATURE_GRID = [
  {
    title: "Mail",
    desc: "Full IMAP/POP/SMTP inbox with your brand on every message.",
  },
  {
    title: "Calendar & Tasks",
    desc: "CalDAV calendars and task lists that sync across devices.",
  },
  {
    title: "Webmail & PWA",
    desc: "Modern webmail that works offline as a progressive web app.",
  },
  {
    title: "Spam & phishing",
    desc: "Filters and threat protection before junk reaches your inbox.",
  },
  {
    title: "Mobile sync",
    desc: "Native setup on iOS, Android, Outlook and Apple Mail.",
  },
  {
    title: "Self-migration",
    desc: "Move existing mailboxes with guided tools — no downtime drama.",
  },
  {
    title: "Address book",
    desc: "Contacts that stay in sync with your team and devices.",
  },
  {
    title: "Admin controls",
    desc: "Aliases, distribution lists and team management on Business.",
  },
];

const FAQ = [
  {
    q: "Do I need a domain with Legacy Hosting?",
    a: "You need a domain you control. Register a new one with us, or point an existing domain’s MX records to our mail infrastructure. Email works independently of where your website is hosted.",
  },
  {
    q: "Can I migrate from Gmail, Microsoft 365 or another host?",
    a: "Yes. Professional and Business plans include a self-migration tool. Most moves complete in minutes; larger archives can run in the background while you keep working.",
  },
  {
    q: "What is the money-back guarantee?",
    a: "New email subscriptions include a 14-day cooling-off window aligned with our cancellation policy. If it is not the right fit, cancel within that window for a pro-rata refund where applicable.",
  },
  {
    q: "How many mailboxes do I get?",
    a: "Professional Mail includes 5 mailboxes. Business Email includes 25. Extra mailboxes and higher storage tiers will appear as catalogue add-ons as we expand the product line.",
  },
  {
    q: "Which protocols are supported?",
    a: "IMAP, POP3, SMTP and CalDAV over TLS. Use any standard desktop or mobile client, or our webmail and PWA.",
  },
  {
    q: "Is this included with Web Hosting?",
    a: "Shared hosting plans include a set number of mailboxes. Standalone Email plans are for customers who want professional mail without a hosting package — or need more mailboxes and collaboration features.",
  },
];

export default function EmailPage() {
  const plans = getActiveEmailProducts();
  const fromPrice = plans[0]?.pricing.monthly ?? 29;

  return (
    <main>
      {/* —— Hero: HostAfrica-style split with big price callout —— */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020b19]/85 via-[#04132a]/92 to-[#04132a]" />
        <div className="pointer-events-none absolute inset-0 bg-[#04132a]/35" />

        <div className="lh-container relative z-10 py-8 sm:py-10 md:py-12">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/55">
              <li>
                <Link href="/" className="hover:text-highlight">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-white/30">›</span>
                <span className="text-highlight/90">Email</span>
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 backdrop-blur-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
                  Professional Email
                </span>
              </div>
              <h1 className="text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.6rem]">
                Email that is secure, intelligent, and{" "}
                <span className="bg-gradient-to-r from-highlight via-accent to-highlight bg-clip-text text-transparent">
                  effortless to use
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-[15px]">
                Custom business addresses on your domain, plus calendars, tasks
                and mobile sync — protected with modern spam filters and backed
                by South African support. ZAR billing. No free-provider branding.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href="#plans"
                  className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-highlight to-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-95"
                >
                  View plans
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </a>
                <Link
                  href="/domains"
                  className="rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Register domain
                </Link>
              </div>
            </div>

            {/* Big price card */}
            <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.03] p-6 shadow-2xl backdrop-blur-md sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                Email Hosting
              </p>
              <p className="mt-1 text-sm text-gray-300">from</p>
              <p className="mt-1 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tabular-nums tracking-tight text-white sm:text-5xl">
                  {formatZAR(fromPrice)}
                </span>
                <span className="text-sm text-gray-400">/mo</span>
              </p>
              <p className="mt-2 text-xs text-white/45">
                VAT-inclusive display · 14-day cooling-off
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-gray-200">
                {[
                  "Custom @yourdomain addresses",
                  "Webmail, IMAP and mobile sync",
                  "Spam & phishing protection",
                  "Works with any domain",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-0.5 text-highlight">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#plans"
                className="mt-6 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-highlight to-accent px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]"
              >
                Choose a plan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-white/5 bg-surface/40">
        <div className="lh-container flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3.5 text-[13px] text-gray-400">
          <span className="font-medium text-white/70">ZAR pricing</span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>South African support</span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>14-day cooling-off</span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>Works with any domain</span>
        </div>
      </div>

      {/* Plans */}
      <section id="plans" className="scroll-mt-28 py-14 md:py-20">
        <div className="lh-container">
          <div className="mb-10 text-center">
            <span className="lh-section-label">Service packages</span>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              Plans tailored to{" "}
              <span className="gradient-text">your team</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-400">
              Whether you are a solo founder or a growing company — pick the
              package that fits. Prices from the catalogue; checkout wires
              through FOSSBilling next.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {plans.map((plan) => {
              const r = plan.resources as EmailResources | undefined;
              const featured =
                (plan.marketing as { featured?: boolean } | undefined)
                  ?.featured === true;
              const badge = (plan.marketing as { badge?: string } | undefined)
                ?.badge;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-7 ${
                    featured
                      ? "border-highlight/45 bg-gradient-to-b from-highlight/10 to-surface shadow-lg shadow-highlight/10"
                      : "border-white/10 bg-surface/50"
                  }`}
                >
                  {badge && (
                    <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      {badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="mt-1.5 text-sm text-gray-400">
                    {plan.description}
                  </p>
                  <p className="mt-5">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                      From
                    </span>
                    <span className="mt-0.5 flex items-baseline gap-1">
                      <span className="text-3xl font-bold tabular-nums text-white">
                        {plan.pricing.monthly
                          ? formatZAR(plan.pricing.monthly)
                          : "—"}
                      </span>
                      <span className="text-sm text-gray-400">/mo</span>
                    </span>
                    {plan.pricing.annual != null && (
                      <span className="mt-0.5 block text-xs text-white/40">
                        or {formatZAR(plan.pricing.annual)}/yr
                      </span>
                    )}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-white/60">
                    {r?.mailboxes != null && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                        {r.mailboxes} mailboxes
                      </span>
                    )}
                    {r?.storageGBPerMailbox != null && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                        {r.storageGBPerMailbox} GB / mailbox
                      </span>
                    )}
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5 text-sm text-gray-300">
                    {(plan.features ?? []).map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-0.5 shrink-0 text-highlight">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/domains"
                    className={`mt-8 inline-flex justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      featured
                        ? "bg-gradient-to-r from-highlight to-accent text-white hover:scale-[1.02]"
                        : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    Choose {plan.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why + feature grid */}
      <section className="border-t border-white/5 bg-surface/30 py-14 md:py-16">
        <div className="lh-container">
          <div className="mb-10 max-w-2xl">
            <span className="lh-section-label">Why Legacy Email</span>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              More than just an inbox
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Look professional with a branded address, stay productive with
              calendars and tasks, and keep threats out — without enterprise
              complexity or foreign billing surprises.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_GRID.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/10 bg-primary/40 p-5"
              >
                <h3 className="text-sm font-bold text-white">{f.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-16">
        <div className="lh-container">
          <div className="mb-8 text-center">
            <span className="lh-section-label">FAQ</span>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              Common questions
            </h2>
          </div>
          <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-surface/40">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group px-5 py-4 open:bg-white/[0.02]"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {item.q}
                    <span className="shrink-0 text-highlight transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA band */}
      <section className="border-t border-white/5 pb-4">
        <div className="lh-container">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-highlight/10 via-surface to-accent/10 px-6 py-10 text-center md:px-12">
            <h2 className="text-xl font-bold text-white md:text-2xl">
              Start from {formatZAR(fromPrice)}/mo
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
              Pair email with a domain for a complete professional presence.
              Same account, ZAR invoices, local support.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="#plans"
                className="inline-flex rounded-lg bg-gradient-to-r from-highlight to-accent px-6 py-2.5 text-sm font-semibold text-white"
              >
                View plans
              </a>
              <Link
                href="/domains"
                className="rounded-lg border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white"
              >
                Register a domain
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
