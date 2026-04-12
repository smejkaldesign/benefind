import { LandingNav } from "@/components/landing-nav";
import { DocsShell } from "@/components/docs/docs-shell";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNav />
      <main className="min-h-screen bg-surface pt-[4.5rem] text-text">
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Docs" },
          ]}
        />
        <DocsShell>{children}</DocsShell>
      </main>
      <Footer />
    </>
  );
}
