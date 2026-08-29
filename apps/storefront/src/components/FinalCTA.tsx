import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="border-b border-white/10 bg-gradient-to-r from-highlight/15 via-surface to-accent/10">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Ready to launch on Legacy Hosting?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[15px] text-gray-300">
          Start with a domain or deploy a Cloud VPS. Same account, ZAR billing,
          South African support.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/domains" className="lh-btn-primary">
            Register a domain
          </Link>
          <Link href="/cloud-vps" className="lh-btn-secondary">
            Deploy Cloud VPS
          </Link>
        </div>
      </div>
    </section>
  );
}
