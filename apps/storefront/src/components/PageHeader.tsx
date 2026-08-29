import Link from "next/link";
import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  cta?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  children?: ReactNode;
}

export function PageHeader({
  badge,
  title,
  highlight,
  description,
  breadcrumb = [],
  cta,
  ctaSecondary,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute left-1/2 top-[-40%] h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-highlight/10 blur-3xl" />

      <div className="lh-container relative py-12 sm:py-16">
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 text-[12px] text-ink-dim">
              <li>
                <Link href="/" className="hover:text-highlight">
                  Home
                </Link>
              </li>
              {breadcrumb.map((item, i) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <span>/</span>
                  {item.href && i < breadcrumb.length - 1 ? (
                    <Link href={item.href} className="hover:text-highlight">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-ink-muted">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-strong bg-soft/80 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-ink-muted">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {title}{" "}
            {highlight && <span className="gradient-text">{highlight}</span>}
          </h1>

          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-lg">
              {description}
            </p>
          )}

          {children}

          {(cta || ctaSecondary) && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {cta && (
                <Link href={cta.href} className="lh-btn-primary">
                  {cta.text}
                </Link>
              )}
              {ctaSecondary && (
                <Link href={ctaSecondary.href} className="lh-btn-secondary">
                  {ctaSecondary.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
