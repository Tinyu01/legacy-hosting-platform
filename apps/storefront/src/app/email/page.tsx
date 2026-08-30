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
  const fromPrice = plans[0]?.pricing.monthly
    ? formatZAR(plans[0].pricing.monthly)
    : "R29";

  return (
    <main>
      <PageHeader
        badge="Professional Email"
        title="Business email"
        highlight="on your domain"
        description={`Custom addresses, webmail, calendars and mobile sync — from ${fromPrice}/mo. Spam protection, ZAR billing and South African support. No free-provider branding.`}
        breadcrumb={[{ label: "Email" }]}
        cta={{ text: "View plans", href: "#plans" }}
        ctaSecondary={{ text: "Register domain", href: "/domains" }}
      />

      {/* Trust strip — same rhythm as pricing jump links */}
      <div className="border-b border-white/5 bg-surface/30">
        <div className="lh-container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-sm text-gray-400">
          <span className="font-medium text-white/70">From {fromPrice}/mo</span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>ZAR pricing</span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>South African support</span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>14-day cooling-off</span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>Works with any domain</span>
        </div>
      </div>

      {/* Plans — matches Web Hosting section structure */}
      <section
        id="plans"
        className="border-b border-white/5 bg-gradient-to-b from-primary via-primary/95 to-soft/20 py-16 md:py-24"
      >
        <div className="lh-container">
          <div className="mb-12 text-center">
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
              Solo founder or growing team — pick the package that fits. Prices
              from the catalogue.
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
                      ? "border-highlight/40 bg-gradient-to-b from-highlight/10 to-surface"
                      : "border-white/10 bg-surface/50"
                  }`}
                >
                  {badge && (
                    <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold uppercase text-white">
                      {badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
                  <p className="mt-5">
                    <span className="text-3xl font-bold tabular-nums text-white">
                      {plan.pricing.monthly
                        ? formatZAR(plan.pricing.monthly)
                        : "—"}
                    </span>
                    <span className="text-sm text-gray-400">/mo</span>
                    {plan.pricing.annual != null && (
                      <span className="mt-0.5 block text-xs text-white/40">
                        or {formatZAR(plan.pricing.annual)}/yr
                      </span>
                    )}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-white/60">
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
                        <span className="text-highlight">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/domains"
                    className="mt-8 inline-flex justify-center rounded-lg bg-gradient-to-r from-highlight to-accent px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Choose {plan.name}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Context cards — same pattern as Web Hosting bottom row */}
          <div className="mt-14 grid gap-6 border-t border-white/10 pt-12 sm:grid-cols-3">
            {[
              {
                t: "With or without hosting",
                b: "Use standalone email, or take the mailboxes included on Web Hosting plans. Same account either way.",
              },
              {
                t: "Bring your domain",
                b: "Register with us or point MX records from a domain you already own. Setup is straightforward.",
              },
              {
                t: "Need a site too?",
                b: (
                  <>
                    Pair with{" "}
                    <Link
                      href="/web-hosting"
                      className="font-semibold text-highlight hover:underline"
                    >
                      Web Hosting
                    </Link>{" "}
                    or{" "}
                    <Link
                      href="/cloud-vps"
                      className="font-semibold text-highlight hover:underline"
                    >
                      Cloud VPS
                    </Link>
                    .
                  </>
                ),
              },
            ].map((block) => (
              <div
                key={block.t}
                className="rounded-2xl border border-white/10 bg-surface/50 p-6"
              >
                <h3 className="text-base font-semibold text-white">{block.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {block.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="lh-container">
          <div className="mb-10 text-center md:text-left">
            <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              Features
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              More than just an{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                inbox
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-gray-400">
              Branded addresses, calendars and tasks, and modern protection —
              without enterprise complexity.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_GRID.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-surface/50 p-6"
              >
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5 bg-gradient-to-b from-primary to-soft/20 py-16 md:py-24">
        <div className="lh-container">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Common{" "}
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                questions
              </span>
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

      <FinalCTA />
    </main>
  );
}
