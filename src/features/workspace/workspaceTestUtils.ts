import { Workspace, WorkspaceBE } from "./store/types";
import { workspaceSlice } from "./store/workspaceSlice";
import { getSelectedWorkspaceAsync, getWorkspacesAsync } from "./store/workspaceFetchers";
import type { TestUtils } from "test-utils";
import { RootState } from "redux-root";

const defaultWSs = [{ id: "w1", name: "www" }];
const defaultSelected = "w1"

export function getMockedWorskapceBE(): Record<keyof WorkspaceBE, jest.Mock> {
    return {
        fetchAll: jest.fn().mockResolvedValue([...defaultWSs]),
        fetchSelectedWorkspace: jest.fn().mockResolvedValue(defaultSelected)
    }
}

type WorkspaceState = {[workspaceSlice.name]: RootState["workspaces"]};

class WorkspacesTestUtils implements TestUtils<"workspaces">{
    getInitializedState(): WorkspaceState;
    getInitializedState(overrides: {items?: Workspace[], selected?: string}): WorkspaceState;
    getInitializedState(overrides?: {items?: Workspace[], selected?: string}): WorkspaceState {
        const state = workspaceSlice.getInitialState();
        const withWS = workspaceSlice.reducer(
            state, 
            getWorkspacesAsync.fulfilled(overrides?.items || defaultWSs, "requestWS")
        );
        const withSelected = workspaceSlice.reducer(
            withWS, 
            getSelectedWorkspaceAsync.fulfilled(overrides?.selected || defaultSelected, "requestSelected")
        );

        return {
            [workspaceSlice.name]: withSelected
        };
    }
}
export const workspaceTestUtils = new WorkspacesTestUtils()