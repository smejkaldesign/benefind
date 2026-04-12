import { LandingNav } from "@/components/landing-nav";
import { SidebarNav } from "@/components/docs/sidebar-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNav />
      <main className="min-h-screen bg-surface pt-[4.5rem] text-text">
        <div className="mx-auto max-w-[1520px] px-6">
          <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[220px_1fr]">
            {/* Sidebar nav */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <SidebarNav />
            </aside>

            {/* Content column */}
            <div className="min-w-0 pb-20">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
