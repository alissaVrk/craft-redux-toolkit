import type { workspaceSlice } from "./workspaceSlice";

export type Workspace = {
    id: string,
    name: string
};

export type { WorkspaceBE } from "./workspaceBE"

export type WorkspacesState = ReturnType<typeof workspaceSlice.reducer>