import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "redux-root";
import { Workspace } from "./types";
import { workspaceSlice } from "./workspaceSlice"

export const selectWorkspace = createAsyncThunk<void, Workspace, ThunkConfig>("workspace/select", (selected, api) => {
    api.dispatch(workspaceSlice.actions.selectWorkspace(selected));
    //TODO: update server
})