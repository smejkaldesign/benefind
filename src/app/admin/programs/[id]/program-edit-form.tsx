"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Tables } from "@/types/database";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateProgram } from "./actions";

type Program = Tables<"programs">;

interface ProgramEditFormProps {
  program: Program;
}

export function ProgramEditForm({ program }: ProgramEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateProgram({
        id: program.id,
        name: (form.get("name") as string) || program.name,
        description: (form.get("description") as string) || null,
        plain_language_summary:
          (form.get("plain_language_summary") as string) || null,
        category: (form.get("category") as string) || program.category,
        status: (form.get("status") as string) || program.status,
        eligibility_criteria:
          (form.get("eligibility_criteria") as string) || "{}",
        application_url: (form.get("application_url") as string) || null,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        router.refresh();
      }
    });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          name="name"
          label="Program Name"
          defaultValue={program.name}
          required
        />

        <div className="space-y-1.5">
          <label
            htmlFor="description"
            className="text-sm font-medium text-text"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={program.description ?? ""}
            className="block w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text transition-colors placeholder:text-text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="plain_language_summary"
            className="text-sm font-medium text-text"
          >
            Plain Language Summary
          </label>
          <textarea
            id="plain_language_summary"
            name="plain_language_summary"
            rows={3}
            defaultValue={program.plain_language_summary ?? ""}
            className="block w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text transition-colors placeholder:text-text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
          />
        </div>

        <Input
          id="category"
          name="category"
          label="Category"
          defaultValue={program.category}
          required
        />

        <div className="space-y-1.5">
          <label htmlFor="status" className="text-sm font-medium text-text">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={program.status}
            className="block h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm text-text transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="eligibility_criteria"
            className="text-sm font-medium text-text"
          >
            Eligibility Criteria (JSON)
          </label>
          <textarea
            id="eligibility_criteria"
            name="eligibility_criteria"
            rows={6}
            defaultValue={JSON.stringify(program.eligibility_criteria, null, 2)}
            className="block w-full rounded-xl border border-border bg-surface px-3 py-2 font-mono text-sm text-text transition-colors placeholder:text-text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
          />
        </div>

        <Input
          id="application_url"
          name="application_url"
          label="Application URL"
          type="url"
          defaultValue={program.application_url ?? ""}
        />

        {error && <Badge variant="error">{error}</Badge>}
        {success && (
          <Badge variant="success">Program updated successfully</Badge>
        )}

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/programs")}
          >
            Back to Programs
          </Button>
        </div>
      </form>
    </Card>
  );
}
