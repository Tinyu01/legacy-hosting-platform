import Link from "next/link";
import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageStat {
  value: string;
  label: string;
}

interface PageHeaderProps {
  badge?: string;
  title: string;
  /** Gradient portion of the title (Tech-style split H1) */
  highlight?: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  cta?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  /** Optional metric strip under CTAs (like Tech service pages) */
  stats?: PageStat[];
  children?: ReactNode;
}

/**
 * Inner-page hero aligned with tech.malenglegacy.co.za service pages:
 * diamond/grid backdrop, breadcrumb, pill badge, gradient title, dual CTAs, stats.
 */
export function PageHeader({
  badge,
  title,
  highlight,
  description,
  breadcrumb = [],
  cta,
  ctaSecondary,
  stats,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-black">
      {/* Tech diamond / grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(20,210,209,0.35) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-highlight/12 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[280px] w-[480px] rounded-full bg-accent/10 blur-[90px]" />

      <div className="lh-container relative z-10 py-14 sm:py-20">
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
              <li>
                <Link href="/" className="hover:text-highlight">
                  Home
                </Link>
              </li>
              {breadcrumb.map((item, i) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <span className="text-white/30">›</span>
                  {item.href && i < breadcrumb.length - 1 ? (
                    <Link href={item.href} className="hover:text-highlight">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-highlight/90">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mx-auto max-w-4xl text-center">
          {badge && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur">
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {title}{" "}
            {highlight && (
              <span className="bg-gradient-to-r from-highlight via-accent to-highlight bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </h1>

          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              {description}
            </p>
          )}

          {children}

          {(cta || ctaSecondary) && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {cta && (
                <Link
                  href={cta.href}
                  className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-highlight to-accent px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 active:scale-95"
                >
                  {cta.text}
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </Link>
              )}
              {ctaSecondary && (
                <Link
                  href={ctaSecondary.href}
                  className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  {ctaSecondary.text}
                </Link>
              )}
            </div>
          )}

          {stats && stats.length > 0 && (
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur"
                >
                  <div className="text-xl font-bold text-white tabular-nums sm:text-2xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] text-white/50 sm:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
