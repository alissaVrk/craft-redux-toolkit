import { createEntityAdapter, createSlice, EntityId, PayloadAction, Update } from "@reduxjs/toolkit";
import { selectors as wsSelectors } from "features/workspace";
import { defer } from "lodash";
import { RootState, SubscribeToChange } from "redux-root";
import { getAllItemsAsync } from "./craftItemsFetchers";
import { CraftItem } from "./types";

export const craftItemsAdapter = createEntityAdapter<CraftItem>();
function getEmptyChanges() {
    return {
        localOnly: false,
        added: [],
        removed: [],
        updated: [],
        version: 1
    } as {
        localOnly: boolean,
        added: EntityId[],
        removed: EntityId[],
        updated: EntityId[],
        version: number
    }
}

export const craftItemsSlice = createSlice({
    name: "items",
    initialState: craftItemsAdapter.getInitialState({
        isFetching: false,
        changes: getEmptyChanges()
    }),
    reducers: {
        updateItem: (state, action: PayloadAction<Update<CraftItem>>) => {
            craftItemsAdapter.updateOne(state, action.payload);
            const change = getEmptyChanges();
            change.updated = [action.payload.id];
            change.version = state.changes.version + 1;
            state.changes = change;
        },
        updateManyItems: craftItemsAdapter.updateMany,
        addManyItem: craftItemsAdapter.addMany
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
    subscribeToStoreChange(wsSelectors.selectSelectedWorkspaceId, (state, dispatch) => {
        if (!state) {
            return;
        }
        defer(() => dispatch(getAllItemsAsync()));
    });
    return craftItemsSlice.reducer
}