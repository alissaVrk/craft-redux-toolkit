import type { workspaceSlice } from "./workspaceSlice";
import type { WorkspaceBE as BE } from "./workspaceBE";
export type WorkspaceBE = BE;


export type Workspace = {
    id: string,
    name: string
};

export type WorkspacesState = ReturnType<typeof workspaceSlice.reducer>