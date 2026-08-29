import Link from "next/link";

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
}

export function PageHeader({
  badge,
  title,
  highlight,
  description,
  breadcrumb = [],
  cta,
  ctaSecondary,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-highlight/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-gray-500">
              <li>
                <Link href="/" className="hover:text-highlight">
                  Home
                </Link>
              </li>
              {breadcrumb.map((item, i) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <span className="text-gray-600">/</span>
                  {item.href && i < breadcrumb.length - 1 ? (
                    <Link href={item.href} className="hover:text-highlight">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-400">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <div className="mb-5 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
              <span className="text-[12px] font-bold uppercase tracking-wider text-accent">
                {badge}
              </span>
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}{" "}
            {highlight && (
              <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </h1>

          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-400 sm:text-lg">
              {description}
            </p>
          )}

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
