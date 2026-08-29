import type { ReactNode } from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}

export function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = "center",
  action,
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div
      className={`mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "sm:flex-col sm:items-center" : ""
      }`}
    >
      <div className={`max-w-2xl ${alignCls}`}>
        {badge && (
          <div className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <span className="text-[12px] font-bold uppercase tracking-wider text-accent">
              {badge}
            </span>
          </div>
        )}
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          {title}{" "}
          {highlight && <span className="gradient-text">{highlight}</span>}
        </h2>
        {description && (
          <p className="mt-2 text-[14px] text-ink-muted">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
