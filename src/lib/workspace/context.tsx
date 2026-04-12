"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Tables } from "@/types/database";

type Workspace = Tables<"workspaces">;

interface WorkspaceMembership {
  workspace_id: string;
  role: string;
  // Supabase join shape: workspaces(*) returns the relation object
  workspaces: Workspace | Workspace[] | null;
}

interface WorkspaceContextValue {
  /** The currently active workspace. Null only during initial load. */
  workspace: Workspace | null;
  /** All workspaces the user is a member of. */
  workspaces: Workspace[];
  /** Switch the active workspace by ID. */
  switchWorkspace: (workspaceId: string) => void;
  /** Whether the workspace list is loading. */
  loading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

interface WorkspaceProviderProps {
  children: ReactNode;
  /** Server-fetched workspace memberships, passed from the layout. */
  memberships: WorkspaceMembership[];
  /** The ID of the initially active workspace (from cookie or first in list). */
  initialWorkspaceId?: string;
}

export function WorkspaceProvider({
  children,
  memberships,
  initialWorkspaceId,
}: WorkspaceProviderProps) {
  const workspaces = memberships
    .map((m) => {
      const ws = m.workspaces;
      if (Array.isArray(ws)) return ws[0] ?? null;
      return ws;
    })
    .filter((ws): ws is Workspace => ws !== null);

  const initial =
    workspaces.find((w) => w.id === initialWorkspaceId) ??
    workspaces[0] ??
    null;

  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(
    initial,
  );

  const switchWorkspace = useCallback(
    (workspaceId: string) => {
      const ws = workspaces.find((w) => w.id === workspaceId);
      if (ws) {
        setActiveWorkspace(ws);
        // Persist the selection in a cookie so the server can read it
        const secure = window.location.protocol === "https:" ? ";secure" : "";
        document.cookie = `bf-workspace=${workspaceId};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax${secure}`;
      }
    },
    [workspaces],
  );

  return (
    <WorkspaceContext.Provider
      value={{
        workspace: activeWorkspace,
        workspaces,
        switchWorkspace,
        loading: false,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

/**
 * Access the active workspace and workspace list.
 * Must be used inside a WorkspaceProvider (i.e., within authenticated layouts).
 */
export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return ctx;
}
