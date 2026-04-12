"use client";

import { useWorkspace } from "@/lib/workspace/context";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function WorkspacePicker() {
  const { workspace, workspaces, switchWorkspace } = useWorkspace();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Single workspace: just show the name, no dropdown
  if (workspaces.length <= 1) {
    return (
      <span className="text-sm font-medium text-text-muted truncate max-w-[140px]">
        {workspace?.name ?? "Workspace"}
      </span>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-text-muted hover:text-text hover:bg-surface-bright transition-colors"
      >
        <span className="truncate max-w-[140px]">
          {workspace?.name ?? "Workspace"}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Switch workspace"
          className="absolute left-0 top-full mt-1 z-50 min-w-[180px] rounded-lg border border-border bg-surface shadow-lg py-1"
        >
          {workspaces.map((ws) => (
            <li
              key={ws.id}
              role="option"
              aria-selected={ws.id === workspace?.id}
            >
              <button
                onClick={() => {
                  switchWorkspace(ws.id);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                  ws.id === workspace?.id
                    ? "text-brand font-medium bg-brand/5"
                    : "text-text-muted hover:text-text hover:bg-surface-bright"
                }`}
              >
                {ws.name}
                {ws.type === "individual" && (
                  <span className="ml-1.5 text-xs text-text-subtle">
                    (personal)
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
