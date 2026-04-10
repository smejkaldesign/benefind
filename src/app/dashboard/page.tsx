import { requireAuth } from "@/components/auth-guard";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileSearch } from "lucide-react";

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <div className="space-y-6">
      <PageHeader title="Welcome back" description={user.email ?? undefined} />

      <Card className="text-center">
        <FileSearch className="mx-auto h-10 w-10 text-text-subtle" />
        <h2 className="mt-4 font-semibold text-text">No screenings yet</h2>
        <p className="mt-2 text-sm text-text-muted">
          Start a screening to discover benefits you qualify for.
        </p>
        <div className="mt-4">
          <Link href="/screening">
            <Button size="default">
              Start Screening
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
