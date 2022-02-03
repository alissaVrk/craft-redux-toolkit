import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig, getAxionDefaultConfig } from "redux-root";
import { Workspace } from "./types";
import * as workspaceBE from "./workspaceBE";

export const getWorkspacesAsync = createAsyncThunk<Array<Workspace>, void, ThunkConfig>("workspaces/items", (state, thunkAPI) => {
    const config = getAxionDefaultConfig(thunkAPI.getState())
    return workspaceBE.fetchAll(config);
});

export const getSelectedWorkspaceAsync = createAsyncThunk<string, void, ThunkConfig>("workspaces/selected", (state, thunkAPI) => {
    const config = getAxionDefaultConfig(thunkAPI.getState())
    return workspaceBE.fetchSelectedWorkspace(config);
})