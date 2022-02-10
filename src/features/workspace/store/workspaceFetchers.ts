import { createThunkWithBE_API } from "redux-root";

export const getWorkspacesAsync = createThunkWithBE_API("workspaces/items", (args, thunkAPI, beApi) => {
    return beApi.workspace.fetchAll();
});

export const getSelectedWorkspaceAsync = createThunkWithBE_API("workspaces/selected", (args, thunkAPI, beApi) => {
    return beApi.workspace.fetchSelectedWorkspace();
})