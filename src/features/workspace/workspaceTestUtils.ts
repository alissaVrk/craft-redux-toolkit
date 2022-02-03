import { Workspace } from "./store/types";
import * as wsBE from "./store/workspaceBE";
import { workspaceSlice } from "./store/workspaceSlice";
import { getSelectedWorkspaceAsync, getWorkspacesAsync } from "./store/workspaceFetchers";
import { TestUtils } from "test-utils/testUtilsHelpers";
import { RootState } from "redux-root";

const defaultWSs = [{ id: "w1", name: "www" }];
const defaultSelected = "w1"
interface WorkspacesTestUtils extends TestUtils<"workspaces"> {
    getInitializedState: (overrides?: {items?: Workspace[], selected?: string}) => {[workspaceSlice.name]: RootState["workspaces"]}
    mockFetchAll: (items?: Workspace[]) => jest.SpyInstance
    mockFetchSelected: (productId?: string) => jest.SpyInstance
}

const testUtils: WorkspacesTestUtils = {
    getInitializedState: (overrides) => {
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
    },
    mockFetchAll: (items) => {
        return jest.spyOn(wsBE, "fetchAll").mockImplementation(() =>
            Promise.resolve(items || defaultWSs)
        );
    },
    mockFetchSelected: (productId) => {
        return jest.spyOn(wsBE, "fetchSelectedWorkspace").mockImplementation(() =>
            Promise.resolve(productId || defaultSelected)
        );
    }
}

export default testUtils;