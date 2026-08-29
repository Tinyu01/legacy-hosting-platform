import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="border-t border-white/5 py-16 md:py-24">
      <div className="lh-container">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-soft via-surface to-primary px-8 py-14 text-center md:px-16 md:py-16">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to launch on{" "}
            <span className="bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
              Legacy Hosting?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-gray-300 sm:text-lg">
            Start with a domain or deploy a Cloud VPS. Same account, ZAR billing,
            South African support.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/domains"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-highlight to-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:scale-105"
            >
              Register a domain
            </Link>
            <Link
              href="/cloud-vps"
              className="rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Deploy Cloud VPS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
