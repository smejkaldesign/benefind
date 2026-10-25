"use client";

import { useState } from "react";
import { getMergedDocumentChecklist } from "@/lib/benefits/documents";
import { ALL_PROGRAMS } from "@/lib/benefits/engine";
import { useI18n } from "@/lib/i18n/context";
import { fmt } from "@/lib/i18n/format";
import {
  localizeDocument,
  localizeProgramName,
} from "@/lib/i18n/localize-program";
import { Check, FileText, ChevronDown, ChevronRight } from "lucide-react";

interface DocumentChecklistProps {
  programIds: string[];
}

export function DocumentChecklist({ programIds }: DocumentChecklistProps) {
  const { t } = useI18n();
  const c = t.resultsPage.checklist;
  const checklist = getMergedDocumentChecklist(programIds);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleCheck(name: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function toggleExpand(name: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  const progress =
    checklist.length > 0
      ? Math.round((checked.size / checklist.length) * 100)
      : 0;

  if (checklist.length === 0) {
    return (
      <div className="space-y-3 py-8 text-center">
        <FileText className="mx-auto h-8 w-8 text-text-subtle" />
        <p className="text-sm text-text-muted">{c.emptyTitle}</p>
        <p className="text-xs text-text-subtle">{c.emptyBody}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text">{c.title}</h3>
        <span className="text-xs text-text-muted">
          {fmt(c.gathered, { checked: checked.size, total: checklist.length })}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-surface-bright">
        <div
          className="h-full rounded-full bg-success transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {checklist.map(({ document: source, neededFor }) => {
          const isChecked = checked.has(source.name);
          const isExpanded = expanded.has(source.name);
          const doc = localizeDocument(source, t);
          const programNames = neededFor
            .map((id) =>
              localizeProgramName(
                id,
                t,
                ALL_PROGRAMS.find((p) => p.id === id)?.shortName,
              ),
            )
            .join(c.listSeparator);

          return (
            <div
              key={source.name}
              className={`rounded-xl border transition-colors ${
                isChecked
                  ? "border-success/30 bg-success/5"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-start gap-3 p-3">
                <button
                  onClick={() => toggleCheck(source.name)}
                  aria-label={fmt(
                    isChecked ? c.markNotGathered : c.markGathered,
                    { name: doc.name },
                  )}
                  aria-pressed={isChecked}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                    isChecked
                      ? "border-success bg-success text-surface"
                      : "border-border hover:border-brand"
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm font-medium ${isChecked ? "text-text-muted line-through" : "text-text"}`}
                    >
                      {doc.name}
                    </p>
                    <button
                      onClick={() => toggleExpand(source.name)}
                      aria-label={fmt(isExpanded ? c.collapse : c.expand, {
                        name: doc.name,
                      })}
                      aria-expanded={isExpanded}
                      className="shrink-0 text-text-subtle hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4 rtl:-scale-x-100" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-text-subtle">
                    {fmt(c.neededFor, { names: programNames })}
                  </p>
                  {isExpanded && (
                    <div className="mt-2 space-y-2 text-xs">
                      <p className="text-text-muted">{doc.description}</p>
                      {doc.alternatives && doc.alternatives.length > 0 && (
                        <div>
                          <p className="font-medium text-text-muted">
                            {c.acceptedForms}
                          </p>
                          <ul className="mt-0.5 list-disc ps-4 text-text-subtle">
                            {doc.alternatives.map((alt) => (
                              <li key={alt}>{alt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {doc.tip && (
                        <p className="rounded-lg bg-brand/5 px-2 py-1.5 text-brand">
                          <FileText className="me-1 inline h-3 w-3" />
                          {doc.tip}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
