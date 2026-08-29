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
  /** Optional metric strip under CTAs */
  stats?: PageStat[];
  /** Override hero photo (defaults to Tech-style earth/infrastructure shot) */
  backgroundImage?: string;
  children?: ReactNode;
}

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80";

/**
 * Inner-page hero aligned with tech.malenglegacy.co.za:
 * photographic backdrop, tight breadcrumb → title stack, dual CTAs.
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
  backgroundImage = DEFAULT_HERO_IMAGE,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      {/* Photo background (Tech-style) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden
      />
      {/* Readability overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020b19]/85 via-[#04132a]/90 to-[#04132a]" />
      <div className="pointer-events-none absolute inset-0 bg-[#04132a]/40" />
      {/* Subtle diamond grid like Tech */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L40 20 L30 30 L20 20 Z' fill='none' stroke='rgba(255,255,255,0.15)' stroke-width='1'/%3E%3Ccircle cx='30' cy='20' r='2' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="lh-container relative z-10 py-8 sm:py-10 md:py-12">
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/55">
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

        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-2xl font-bold leading-[1.2] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            {title}{" "}
            {highlight && (
              <span className="bg-gradient-to-r from-highlight via-accent to-highlight bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </h1>

          {description && (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-[15px]">
              {description}
            </p>
          )}

          {children}

          {(cta || ctaSecondary) && (
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {cta && (
                <Link
                  href={cta.href}
                  className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-highlight to-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-95"
                >
                  {cta.text}
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </Link>
              )}
              {ctaSecondary && (
                <Link
                  href={ctaSecondary.href}
                  className="rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  {ctaSecondary.text}
                </Link>
              )}
            </div>
          )}

          {stats && stats.length > 0 && (
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur"
                >
                  <div className="text-lg font-bold text-white tabular-nums sm:text-xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
