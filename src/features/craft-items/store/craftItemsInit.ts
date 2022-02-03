import { createAsyncThunk } from "@reduxjs/toolkit";
import { subscribeToWorkspaceChanged } from "features/workspace";
import { defer } from "lodash";
import { getAxionDefaultConfig, SubscribeToChange, ThunkConfig } from "redux-root";
import { CraftItem } from ".";
import { fetchAll } from "./craftItemsBE";
import { craftItemsSlice } from "./craftItemsSlice";

export function initSlice({ subscribeToStoreChange }: { subscribeToStoreChange: SubscribeToChange }) {
    subscribeToWorkspaceChanged(subscribeToStoreChange, (state, dispatch) => {
        if (!state) {
            return;
        }
        defer(() => dispatch(getAllItemsAsync()));
    });
    return {
        reducer: craftItemsSlice.reducer,
        name: craftItemsSlice.name
    }
}

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