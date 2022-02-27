import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "redux-root";
import { workspaceSlice } from "./workspaceSlice"

export const selectWorkspace = createAsyncThunk<void, string, ThunkConfig>("workspace/select", (selected, api) => {
    api.dispatch(workspaceSlice.actions.selectWorkspace(selected));
    //TODO: update server
})