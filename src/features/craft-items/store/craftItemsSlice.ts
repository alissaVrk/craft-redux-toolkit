import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { subscribeToWorkspaceChanged } from "features/workspace";
import { defer } from "lodash";
import { RootState, SubscribeToChange } from "redux-root";
import { getAllItemsAsync } from "./craftItemsFetchers";
import { CraftItem } from "./types";

export const craftItemsAdapter = createEntityAdapter<CraftItem>();

export const craftItemsSlice = createSlice({
    name: "items",
    initialState: craftItemsAdapter.getInitialState({
        isFetching: false,
    }),
    reducers: {
        updateItem: craftItemsAdapter.updateOne,
        updateManyItems: craftItemsAdapter.updateMany
    },
    extraReducers: builder => {
        builder.addCase(getAllItemsAsync.fulfilled, (state, action) => {
            craftItemsAdapter.setAll(state, action.payload);
            state.isFetching = false;
        });
        builder.addCase(getAllItemsAsync.pending, (state) => {
            state.isFetching = true
        });
    }
})

export const selectors = craftItemsAdapter.getSelectors((state: RootState) => state.items);

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