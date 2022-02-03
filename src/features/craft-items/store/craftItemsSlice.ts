import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux-root";
import { CraftItem } from "./types";
import { getAllItemsAsync } from "./craftItemsInit"

export const craftItemsAdapter = createEntityAdapter<CraftItem>();

export const craftItemsSlice = createSlice({
    name: "items",
    initialState: craftItemsAdapter.getInitialState({
        isFetching: false,
        selectedWorkspace: null as null | string
    }),
    reducers: {
        updateItem: craftItemsAdapter.updateOne
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