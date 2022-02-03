import { Workspace } from "./store/types";
import * as wsBE from "./store/workspaceBE";
import { workSpaceSlice } from "./store/workSpaceSlice";
import { getSelectedWorkspaceAsync, getWorkspacesAsync } from "./store/workspaceThunks";

const defaultWSs = [{ id: "w1", name: "www" }];
const defaultSelected = "w1"

export function mockFetchAll(items?: Workspace[]) {
    return jest.spyOn(wsBE, "fetchAll").mockImplementation(() =>
        Promise.resolve(items || defaultWSs)
    );
}

export function mockFetchSelected(productId?: string) {
    return jest.spyOn(wsBE, "fetchSelectedWorkspace").mockImplementation(() =>
        Promise.resolve(productId || defaultSelected)
    );
}

export function getInitializedState(){
    const state = workSpaceSlice.getInitialState();
    const withWS = workSpaceSlice.reducer(state, getWorkspacesAsync.fulfilled(defaultWSs, "requestWS"));
    const withSelected = workSpaceSlice.reducer(withWS, getSelectedWorkspaceAsync.fulfilled(defaultSelected, "requestSelected"));

    return {
        [workSpaceSlice.name]: withSelected
    };
}