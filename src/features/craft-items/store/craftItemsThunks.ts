import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxionDefaultConfig, ThunkConfig } from "redux-root";
import { fetchAll } from "./craftItemsBE";
import { CraftItem } from "./types";

export const getAllItemsAsync = createAsyncThunk<CraftItem[], void, ThunkConfig>("items/fetchAll", (_, api) => {
    const state = api.getState();
    const config = getAxionDefaultConfig(api.getState());
    const userId = state.auth.base.userId;
    const selectedWS = state.workspaces.selectedWorkspace;
    if (!selectedWS) {
        return Promise.reject("you really need a selected WS for this");
    }
    return fetchAll(selectedWS, userId, config);
});