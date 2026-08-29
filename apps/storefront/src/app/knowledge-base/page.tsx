import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";

export const metadata = {
  title: "Knowledge base",
  description: "Guides for domains, hosting and Cloud VPS on Legacy Hosting.",
};

const topics = [
  {
    t: "Domains",
    items: ["Register a .co.za", "Transfer a domain", "Manage DNS"],
    href: "/domains",
  },
  {
    t: "Web Hosting",
    items: ["Publish a site", "SSL certificates", "Email on hosting"],
    href: "/web-hosting",
  },
  {
    t: "Cloud VPS",
    items: ["First login (SSH)", "Snapshots & backups", "Firewall basics"],
    href: "/cloud-vps",
  },
];

export default function KnowledgeBasePage() {
  return (
    <main>
      <PageHeader
        badge="Resources"
        title="Knowledge"
        highlight="base"
        description="Short guides for common tasks. Full articles land as the portal and support stack go live."
        breadcrumb={[{ label: "Knowledge base" }]}
      />

      <section className="py-12 md:py-16">
        <div className="lh-container grid gap-6 md:grid-cols-3">
          {topics.map((topic) => (
            <div
              key={topic.t}
              className="rounded-2xl border border-white/10 bg-surface/50 p-6"
            >
              <h2 className="text-lg font-bold text-white">{topic.t}</h2>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                {topic.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
              <Link
                href={topic.href}
                className="mt-6 inline-block text-sm font-semibold text-highlight hover:underline"
              >
                Product page →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
