import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { defer } from "lodash";
import { RootState, SubscribeToChange } from "redux-root";
import { subscribeToWorkspaceChanged } from "features/workspace"
import { CraftItem } from "./types";
import { getAllItemsAsync } from "./craftItemsThunks"

export const workspacesAdapter = createEntityAdapter<CraftItem>();

export const workSpaceSlice = createSlice({
    name: "items",
    initialState: workspacesAdapter.getInitialState({
        isFetching: false,
        selectedWorkspace: null as null | string
    }),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllItemsAsync.fulfilled, (state, action) => {
            workspacesAdapter.setAll(state, action.payload);
            state.isFetching = false;
        });
        builder.addCase(getAllItemsAsync.pending, (state) => {
            state.isFetching = true
        });
    }
})

export const selectors = workspacesAdapter.getSelectors((state: RootState) => state.items);

export function initSlice({ subscribeToStoreChange }: { subscribeToStoreChange: SubscribeToChange }) {
    subscribeToWorkspaceChanged(subscribeToStoreChange, (state, dispatch) => {
        if (!state) {
            return;
        }
        defer(() => dispatch(getAllItemsAsync()));
    });
    return {
        reducer: workSpaceSlice.reducer,
        name: workSpaceSlice.name
    }
}