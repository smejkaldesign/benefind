"use client";

import { useWorkspace } from "@/lib/workspace/context";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

export function WorkspacePicker() {
  const { workspace, workspaces, switchWorkspace } = useWorkspace();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Focus management: move focus into list on open, return on close
  useEffect(() => {
    if (open) {
      const selectedIdx = workspaces.findIndex((w) => w.id === workspace?.id);
      setActiveIndex(selectedIdx >= 0 ? selectedIdx : 0);
      // Focus the listbox so keyboard events work
      requestAnimationFrame(() => listRef.current?.focus());
    }
  }, [open, workspaces, workspace?.id]);

  const closeAndReturn = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const selectOption = useCallback(
    (index: number) => {
      const ws = workspaces[index];
      if (ws) {
        switchWorkspace(ws.id);
        closeAndReturn();
      }
    },
    [workspaces, switchWorkspace, closeAndReturn],
  );

  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < workspaces.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : workspaces.length - 1,
          );
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(workspaces.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (activeIndex >= 0) selectOption(activeIndex);
          break;
        case "Escape":
          e.preventDefault();
          closeAndReturn();
          break;
      }
    },
    [workspaces.length, activeIndex, selectOption, closeAndReturn],
  );

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") &&
        !open
      ) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        closeAndReturn();
      }
    },
    [open, closeAndReturn],
  );

  // Single workspace: just show the name, no dropdown
  if (workspaces.length <= 1) {
    return (
      <span className="text-sm font-medium text-text-muted truncate max-w-[140px]">
        {workspace?.name ?? "Workspace"}
      </span>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Switch workspace"
        className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-text-muted hover:text-text hover:bg-surface-bright transition-colors min-h-[44px]"
      >
        <span className="truncate max-w-[140px]" title={workspace?.name}>
          {workspace?.name ?? "Workspace"}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label="Switch workspace"
          aria-activedescendant={
            activeIndex >= 0 ? `ws-option-${activeIndex}` : undefined
          }
          tabIndex={0}
          onKeyDown={handleListKeyDown}
          className="absolute left-0 top-full mt-1 z-50 min-w-[180px] rounded-lg border border-border bg-surface shadow-lg py-1 outline-none"
        >
          {workspaces.map((ws, i) => (
            <li
              key={ws.id}
              id={`ws-option-${i}`}
              role="option"
              aria-selected={ws.id === workspace?.id}
            >
              <button
                onClick={() => selectOption(i)}
                tabIndex={-1}
                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                  ws.id === workspace?.id
                    ? "text-brand font-medium bg-brand/5"
                    : "text-text-muted hover:text-text hover:bg-surface-bright"
                } ${i === activeIndex ? "ring-2 ring-inset ring-brand bg-surface-bright" : ""}`}
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
