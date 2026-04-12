"use client";

import { usePathname } from "next/navigation";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import { DesignSidebarNav } from "@/components/docs/design-sidebar-nav";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesignSystem = pathname.startsWith("/docs/design-system");

  return (
    <div className="mx-auto max-w-[1520px] px-6">
      <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[220px_1fr]">
        {/* Sidebar nav */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          {isDesignSystem ? <DesignSidebarNav /> : <SidebarNav />}
        </aside>

        {/* Content column */}
        <div className="min-w-0 pb-20">{children}</div>
      </div>
    </div>
  );
}
