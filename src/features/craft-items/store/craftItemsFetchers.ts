import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig, getAxionDefaultConfig } from "redux-root";
import { CraftItem } from ".";
import * as craftItemsBE from "./craftItemsBE";

export const getAllItemsAsync = createAsyncThunk<CraftItem[], void, ThunkConfig>("items/fetchAll", (_, api) => {
    const state = api.getState();
    const config = getAxionDefaultConfig(api.getState());
    const userId = state.auth.base.userId;
    const selectedWS = state.workspaces.selectedWorkspace;
    if (!selectedWS) {
        return Promise.reject("you really need a selected WS for this");
    }
    return craftItemsBE.fetchAll(selectedWS, userId, config);
});