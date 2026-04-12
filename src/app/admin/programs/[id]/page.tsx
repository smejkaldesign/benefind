import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { getProgram } from "@/lib/db/programs";
import { PageHeader } from "@/components/layout/page-header";
import { ProgramEditForm } from "./program-edit-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminProgramEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: program, error } = await getProgram(supabase, id);

  if (error || !program) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit: ${program.name}`}
        description="Update program details"
      />
      <ProgramEditForm program={program} />
    </div>
  );
}
