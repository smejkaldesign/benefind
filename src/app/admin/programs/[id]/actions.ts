"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { isUserAdmin, updateProgramById } from "@/lib/db/admin";
import type { Json } from "@/types/database";

interface UpdateProgramInput {
  id: string;
  name: string;
  description: string | null;
  plain_language_summary: string | null;
  category: string;
  status: string;
  eligibility_criteria: string;
  application_url: string | null;
}

export async function updateProgram(input: UpdateProgramInput) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: admin } = await isUserAdmin(supabase, user.id);
  if (!admin) {
    return { error: "Not authorized" };
  }

  let parsedCriteria: Json;
  try {
    parsedCriteria = JSON.parse(input.eligibility_criteria) as Json;
  } catch (err) {
    const detail = err instanceof SyntaxError ? err.message : "unknown error";
    return { error: `Invalid JSON in eligibility criteria: ${detail}` };
  }

  if (
    parsedCriteria === null ||
    typeof parsedCriteria !== "object" ||
    Array.isArray(parsedCriteria)
  ) {
    return {
      error:
        "Eligibility criteria must be a JSON object (not an array or primitive)",
    };
  }

  const { error } = await updateProgramById(supabase, input.id, {
    name: input.name,
    description: input.description || null,
    plain_language_summary: input.plain_language_summary || null,
    category: input.category,
    status: input.status,
    eligibility_criteria: parsedCriteria,
    application_url: input.application_url || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/programs");
  revalidatePath(`/admin/programs/${input.id}`);

  return { error: null };
}
