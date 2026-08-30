"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@legacy-hosting/types";
import {
  formatZAR,
  getActiveDomainProducts,
  getActiveVpsProducts,
  getActiveWebHostingProducts,
} from "../lib/catalog";
import { VpsPlanCard } from "../components/VpsPlanCard";
import { HostingPlanCard } from "../components/HostingPlanCard";
import {
  Globe,
  HardDrive,
  Cloud,
  Shield,
  Lock,
} from "lucide-react";

// Managed VPS isn't its own catalogue line yet — it's the cheapest VPS plan
// plus a flat management premium. Once `getActiveManagedVpsProducts()` (or
// equivalent) exists in lib/catalog.ts, swap this constant out for real data.
const MANAGED_VPS_MONTHLY_PREMIUM = 400;

// Local resource shapes, matching VpsPlanCard.tsx / HostingPlanCard.tsx —
// used here only to build the at-a-glance comparison tables below the grids.
type VpsResources = {
  vcpu?: number;
  ramGB?: number;
  storage?: { sizeGB: number; type: string };
  traffic?: { includedTB: number };
  ipv4?: number;
};

type HostingResources = {
  storageGB?: number;
  websites?: number;
  databases?: number;
  mailboxes?: number;
};

const faqs = [
  {
    q: "Do I need a domain before I host with you?",
    a: "No. You can start a hosting or VPS plan first and point an existing domain at it later, or register one with us at checkout — either order works.",
  },
  {
    q: "Can you migrate my current site?",
    a: "Yes. Send us access to your current host and we'll move web hosting accounts across at no extra cost. VPS migrations are quoted based on what's on the server.",
  },
  {
    q: "What happens if I'm not happy after signing up?",
    a: "Hosting and VPS plans carry a 7-day cooling-off period from activation. Domain registrations are non-refundable once registered, in line with registry rules.",
  },
  {
    q: "Is VAT included in the prices shown?",
    a: "Prices shown are excluding VAT. VAT is calculated and shown before you pay, at checkout — there's no other line item added later.",
  },
];

// TODO: replace with real customer testimonials before launch. Do not
// fabricate names, companies, or quotes — the section below only renders
// once this array is populated. Shape to fill in per entry:
// { quote, name, role, company }
const testimonials: { quote: string; name: string; role: string; company: string }[] = [];

function vpsResourceRows(plans: Product[]) {
  const values = plans.map((p) => (p.resources ?? {}) as VpsResources);
  return [
    { label: "vCPU", cells: values.map((r) => (r.vcpu ? `${r.vcpu} cores` : "—")) },
    { label: "RAM", cells: values.map((r) => (r.ramGB ? `${r.ramGB} GB` : "—")) },
    {
      label: "Storage",
      cells: values.map((r) =>
        r.storage ? `${r.storage.sizeGB} GB ${r.storage.type}` : "—",
      ),
    },
    {
      label: "Transfer",
      cells: values.map((r) => (r.traffic ? `${r.traffic.includedTB} TB` : "—")),
    },
    {
      label: "Dedicated IPv4",
      cells: values.map((r) => (r.ipv4 ? String(r.ipv4) : "—")),
    },
  ];
}

function hostingResourceRows(plans: Product[]) {
  const values = plans.map((p) => (p.resources ?? {}) as HostingResources);
  return [
    { label: "Websites", cells: values.map((r) => r.websites ?? "—") },
    {
      label: "Storage",
      cells: values.map((r) => (r.storageGB != null ? `${r.storageGB} GB NVMe` : "—")),
    },
    { label: "Mailboxes", cells: values.map((r) => r.mailboxes ?? "—") },
    { label: "Databases", cells: values.map((r) => r.databases ?? "—") },
  ];
}

export default function HomePage() {
  const router = useRouter();
  const [domainSearch, setDomainSearch] = useState("");

  const domains = getActiveDomainProducts();
  const vpsPlans = getActiveVpsProducts();
  const hosting = getActiveWebHostingProducts();
  const coza = domains.find((d) => d.slug === "co-za") ?? domains[0];
  const cheapestVps = vpsPlans[0];
  const cheapestHost = hosting[0];

  const managedVpsFrom = cheapestVps?.pricing.monthly
    ? formatZAR(cheapestVps.pricing.monthly + MANAGED_VPS_MONTHLY_PREMIUM)
    : "R599";

  // CRITICAL FIX: Handle domain search form submission with query param
  // ensures /domains page receives the search query and auto-triggers lookup
  const handleDomainSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (domainSearch.trim()) {
      router.push(`/domains?q=${encodeURIComponent(domainSearch.trim())}`);
    }
  };

  const productLines = [
    {
      icon: Globe,
      title: "Domains",
      body: ".co.za, .com and more",
      from: coza?.pricing.registration
        ? formatZAR(coza.pricing.registration)
        : "R149",
      unit: "/yr",
      href: "/domains",
    },
    {
      icon: HardDrive,
      title: "Web Hosting",
      body: "NVMe storage, free SSL, daily backups",
      from: cheapestHost?.pricing.monthly
        ? formatZAR(cheapestHost.pricing.monthly)
        : "R79",
      unit: "/mo",
      href: "/web-hosting",
    },
    {
      icon: Cloud,
      title: "Cloud VPS",
      body: "Root access, deployed in ~60 seconds",
      from: cheapestVps?.pricing.monthly
        ? formatZAR(cheapestVps.pricing.monthly)
        : "R199",
      unit: "/mo",
      href: "/cloud-vps",
    },
    {
      icon: Shield,
      title: "Managed VPS",
      body: "We patch, monitor and secure it",
      from: managedVpsFrom,
      unit: "/mo",
      href: "/cloud-vps",
    },
  ];

  const vpsRows = vpsPlans.length > 1 ? vpsResourceRows(vpsPlans) : [];
  const hostingRows = hosting.length > 1 ? hostingResourceRows(hosting) : [];

  return (
    <main>
      {/* ===== HERO ===== */}
      {/* Calm, single-focus hero: one glow, one dominant action (domain
          search), one clear secondary path (Cloud VPS). Proof-strip stats
          folded into the subtitle so the fold stays short. */}
      <section className="relative flex min-h-[82vh] w-full flex-col overflow-hidden bg-black">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,210,209,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(20,210,209,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-highlight/[0.08] blur-[140px]" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/60">
            South African hosting, billed in rand
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-[3.4rem]">
            Domains, hosting and{" "}
            <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
              cloud servers
            </span>
            , done properly
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-300 sm:text-lg">
            Clear ZAR pricing, VAT shown before you pay, 99.9% uptime, and
            servers deployed in about 60 seconds.
          </p>

          {/* Primary action — FIXED: onSubmit handler with router.push to ensure query param */}
          <form
            onSubmit={handleDomainSearch}
            className="mx-auto mt-10 flex w-full max-w-xl items-center gap-2 rounded-xl border border-white/15 bg-white/5 py-1.5 pl-4 pr-1.5 transition focus-within:border-highlight/50"
          >
            <input
              type="text"
              name="q"
              value={domainSearch}
              onChange={(e) => setDomainSearch(e.target.value)}
              placeholder="Search a domain, e.g. yourbusiness.co.za"
              className="h-11 flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-lg bg-gradient-to-r from-highlight to-accent px-5 text-sm font-semibold text-white"
            >
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {domains.slice(0, 5).map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs text-white/80"
              >
                <span>{d.tld ?? d.name}</span>
                {d.pricing.registration != null && (
                  <span className="font-semibold text-highlight">
                    {formatZAR(d.pricing.registration)}/yr
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Secondary action — clear, but visually subordinate to search */}
          <div className="mt-6 flex items-center gap-3 text-sm text-white/40">
            <span className="h-px w-8 bg-white/15" />
            or
            <span className="h-px w-8 bg-white/15" />
          </div>
          <Link
            href="/cloud-vps"
            className="lh-btn-secondary mt-4 px-6 py-2.5 text-sm"
          >
            Configure a Cloud VPS
          </Link>

          {/* Proof strip — concrete, not marketing adjectives */}
          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { n: "99.9%", l: "Uptime SLA" },
              { n: "~60s", l: "VPS deploy time" },
              { n: "7 days", l: "Cooling-off period" },
              { n: "24/7", l: "Portal access" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <div className="text-2xl font-bold text-white tabular-nums">
                  {s.n}
                </div>
                <div className="mt-1 text-xs text-white/50">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT LINES ===== */}
      {/* Dense, buyable tiles: price is a pill up top, one line of value
          copy, one line of next step. No paragraph. FIXED: Using lucide-react icons */}
      <section className="bg-gradient-to-b from-primary via-primary/95 to-soft py-20 md:py-24">
        <div className="lh-container">
          <div className="mb-12 max-w-2xl">
            <span className="lh-section-label mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              What we host
            </span>
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
              Everything your business runs on
            </h2>
            <p className="text-lg text-gray-300">
              One dashboard, one invoice, one support team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {productLines.map((c) => {
              const IconComponent = c.icon;
              return (
                <Link
                  key={c.title}
                  href={c.href}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-surface p-5 transition-colors duration-200 hover:border-highlight/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                        <IconComponent size={18} className="text-gray-300" />
                      </span>
                      <h3 className="text-base font-bold text-white transition group-hover:text-highlight">
                        {c.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-highlight/30 bg-highlight/10 px-2.5 py-1 text-xs font-bold text-highlight">
                      {c.from}
                      {c.unit}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-400">{c.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-highlight opacity-80 transition group-hover:gap-1.5 group-hover:opacity-100">
                    Get started
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== DASHBOARD PREVIEW ===== */}
      {/* Illustrative mockup, not a literal screenshot — makes "one portal"
          tangible before the buyer commits to a plan. */}
      <section className="border-t border-white/5 py-20 md:py-24">
        <div className="lh-container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="lh-section-label mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              Your portal
            </span>
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
              One login for everything
            </h2>
            <p className="max-w-md text-lg text-gray-300">
              Domains, hosting and servers in a single dashboard — manage
              DNS, watch usage, and reinstall in a click.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/40">
              {/* window chrome */}
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[11px] text-white/30">
                  portal.legacyhosting.co.za
                </span>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-0">
                {/* sidebar */}
                <div className="hidden flex-col gap-1 border-r border-white/10 p-3 text-[11px] text-gray-400 sm:flex">
                  {["Overview", "Domains", "Hosting", "VPS", "Billing"].map(
                    (item, i) => (
                      <span
                        key={item}
                        className={`rounded-md px-2.5 py-1.5 ${
                          i === 0
                            ? "bg-highlight/10 text-highlight"
                            : "text-gray-500"
                        }`}
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>

                {/* content */}
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5">
                    <span className="text-xs text-gray-400">
                      yourbusiness.co.za — DNS
                    </span>
                    <span className="rounded-full bg-highlight/10 px-2 py-0.5 text-[10px] font-semibold text-highlight">
                      Active
                    </span>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3.5">
                    <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
                      <span>VPS 2 — disk usage</span>
                      <span>34 GB / 120 GB</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[28%] rounded-full bg-gradient-to-r from-highlight to-accent" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5">
                    <span className="text-xs text-gray-400">
                      Next invoice — 1 Sept
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {cheapestHost?.pricing.monthly
                        ? formatZAR(cheapestHost.pricing.monthly)
                        : "R79"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* callouts */}
            <span className="absolute -left-3 top-14 hidden rounded-full border border-white/10 bg-primary px-3 py-1 text-[11px] font-medium text-white/70 shadow-lg sm:block">
              Manage DNS
            </span>
            <span className="absolute -right-3 top-[42%] hidden rounded-full border border-white/10 bg-primary px-3 py-1 text-[11px] font-medium text-white/70 shadow-lg sm:block">
              View usage
            </span>
            <span className="absolute -left-3 bottom-10 hidden rounded-full border border-white/10 bg-primary px-3 py-1 text-[11px] font-medium text-white/70 shadow-lg sm:block">
              One-click reinstalls
            </span>
          </div>
        </div>
      </section>

      {/* ===== CLOUD VPS ===== */}
      <section className="border-t border-white/5 py-20 md:py-24">
        <div className="lh-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="lh-section-label mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
                Cloud VPS
              </span>
              <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
                Servers that scale with you
              </h2>
              <p className="text-lg text-gray-300">
                KVM virtualisation, simple ZAR billing, no renewal surprises.
              </p>
            </div>
            <Link href="/cloud-vps" className="lh-btn-secondary shrink-0">
              Compare all VPS specs
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {vpsPlans.map((plan) => (
              <VpsPlanCard key={plan.id} plan={plan} compact />
            ))}
          </div>

          {vpsRows.length > 0 && (
            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-surface">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {/* FIXED: Sticky first column for mobile scrolling */}
                    <th className="sticky left-0 bg-surface/90 px-5 py-3 text-left font-medium text-gray-500 z-10">
                      Spec
                    </th>
                    {vpsPlans.map((plan) => (
                      <th
                        key={plan.id}
                        className="px-5 py-3 text-left font-semibold text-white"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vpsRows.map((row) => (
                    <tr key={row.label} className="border-b border-white/5 last:border-0">
                      {/* FIXED: Sticky first column for mobile scrolling */}
                      <td className="sticky left-0 bg-surface/90 px-5 py-3 text-gray-500 z-10">
                        {row.label}
                      </td>
                      {row.cells.map((cell, i) => (
                        <td key={i} className="px-5 py-3 text-gray-300">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ===== WEB HOSTING ===== */}
      <section className="border-t border-white/5 bg-gradient-to-b from-soft/20 to-transparent py-20 md:py-24">
        <div className="lh-container">
          <div className="mb-10 max-w-xl">
            <span className="lh-section-label mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              Web hosting
            </span>
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
              Shared hosting, properly specified
            </h2>
            <p className="text-lg text-gray-300">
              NVMe storage and daily backups on every plan — no asterisks.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {hosting.map((plan) => (
              <HostingPlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          {hostingRows.length > 0 && (
            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-surface">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {/* FIXED: Sticky first column for mobile scrolling */}
                    <th className="sticky left-0 bg-surface/90 px-5 py-3 text-left font-medium text-gray-500 z-10">
                      Spec
                    </th>
                    {hosting.map((plan) => (
                      <th
                        key={plan.id}
                        className="px-5 py-3 text-left font-semibold text-white"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hostingRows.map((row) => (
                    <tr key={row.label} className="border-b border-white/5 last:border-0">
                      {/* FIXED: Sticky first column for mobile scrolling */}
                      <td className="sticky left-0 bg-surface/90 px-5 py-3 text-gray-500 z-10">
                        {row.label}
                      </td>
                      {row.cells.map((cell, i) => (
                        <td key={i} className="px-5 py-3 text-gray-300">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ===== SECURITY & RELIABILITY ===== */}
      {/* Only claims traceable to product copy already established in this
          project — see chat notes. Swap in real DDoS / retention details
          once confirmed, rather than leaving generic marketing language.
          FIXED: Using lucide-react icons instead of emojis */}
      <section className="border-t border-white/5 py-20 md:py-24">
        <div className="lh-container">
          <div className="mb-10 max-w-xl">
            <span className="lh-section-label mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              Reliability
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Built to stay up
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: Lock,
                t: "Free SSL",
                b: "Included on every Web Hosting plan — every connection encrypted by default.",
              },
              {
                icon: HardDrive,
                t: "Daily backups",
                b: "Included on Web Hosting plans, so a bad update doesn't cost you the site.",
              },
              {
                icon: Shield,
                t: "Isolated by design",
                b: "Every Cloud VPS runs on its own KVM virtual machine — never shared account space.",
              },
            ].map((f) => {
              const IconComponent = f.icon;
              return (
                <div
                  key={f.t}
                  className="rounded-2xl border border-white/10 bg-surface p-6"
                >
                  <IconComponent size={24} className="text-gray-300" />
                  <h3 className="mt-4 text-base font-bold text-white">{f.t}</h3>
                  <p className="mt-1.5 text-sm text-gray-400">{f.b}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      {/* Renders only once `testimonials` above is filled with real quotes. */}
      {testimonials.length > 0 && (
        <section className="border-t border-white/5 bg-gradient-to-b from-soft/20 to-transparent py-20 md:py-24">
          <div className="lh-container">
            <div className="mb-10 max-w-xl">
              <span className="lh-section-label mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
                Customers
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Trusted by South African businesses
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col rounded-2xl border border-white/10 bg-surface p-6"
                >
                  <blockquote className="text-sm leading-relaxed text-gray-300">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="block font-semibold text-white">
                      {t.name}
                    </span>
                    <span className="text-gray-500">
                      {t.role}, {t.company}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== HOW IT WORKS ===== */}
      <section className="border-t border-white/5 py-20 md:py-24">
        <div className="lh-container">
          <div className="mb-12 max-w-xl">
            <span className="lh-section-label mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              How it works
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Live in minutes, not tickets
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", t: "Choose", b: "Pick a domain, hosting plan, or VPS tier." },
              { n: "2", t: "Configure", b: "Location, OS and add-ons with a live total." },
              { n: "3", t: "Checkout", b: "Pay in rand — VAT shown upfront." },
              { n: "4", t: "Manage", b: "One portal for domains, hosting and servers." },
            ].map((s) => (
              <div key={s.n} className="relative pt-4">
                <div className="absolute -top-2 left-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-highlight to-accent text-lg font-bold text-[#04132a]">
                  {s.n}
                </div>
                <div className="rounded-2xl border border-white/10 bg-surface/60 p-6 pt-11">
                  <h3 className="text-lg font-bold text-white">{s.t}</h3>
                  <p className="mt-2 text-sm text-gray-400">{s.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="border-t border-white/5 py-20 md:py-24">
        <div className="lh-container">
          <div className="mb-10 max-w-xl">
            <span className="lh-section-label mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              Questions
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Before you switch
            </h2>
          </div>
          <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-surface/60">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5 open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="shrink-0 text-lg text-white/40 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      {/* Short and decisive: one line, two ranked actions. */}
      <section className="border-t border-white/5 py-20 md:py-24">
        <div className="lh-container">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-soft via-surface to-primary px-8 py-12 text-center md:px-16">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-300">
              Set up your account in minutes — no obligation to bundle.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/cloud-vps"
                className="lh-btn-primary px-8 py-3.5 text-base"
              >
                Configure a server
              </Link>
              <Link
                href="/domains"
                className="lh-btn-secondary px-8 py-3.5 text-base"
              >
                Register a domain
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}