import { createEntityAdapter, createSlice, EntityId, PayloadAction, Update } from "@reduxjs/toolkit";
import { selectors as wsSelectors } from "features/workspace";
import { defer } from "lodash";
import { RootState, SubscribeToChange } from "redux-root";
import { getAllItemsAsync } from "./craftItemsFetchers";
import { CraftItem } from "./types";

type Changes = {
    localOnly: boolean,
    added: EntityId[],
    removed: EntityId[],
    updated: EntityId[],
    version: number
};

export const craftItemsAdapter = createEntityAdapter<CraftItem>();

type AdapterReducerFunc = (state: any, action: PayloadAction<any>) => any;
type AdapterPayload<T extends AdapterReducerFunc> = Parameters<T>["1"]["payload"];
type ActionWithIsLocal<T extends AdapterReducerFunc> = PayloadAction<AdapterPayload<T> & {localOnly?: boolean}>;
type ActionArrWithIsLocal<T extends AdapterReducerFunc> = PayloadAction<{items: AdapterPayload<T>, localOnly?: boolean}> 

function getEmptyChanges() {
    return {
        localOnly: false,
        added: [],
        removed: [],
        updated: [],
        version: 1
    } as Changes
}

function updateStateChanges(state: RootState["items"], isLocal: boolean, specific: Partial<Changes>) {
    const change: Changes = {
        ...getEmptyChanges(),
        version: state.changes.version + 1,
        localOnly: isLocal,
        ...specific
    }
    state.changes = change
}

export const craftItemsSlice = createSlice({
    name: "items",
    initialState: craftItemsAdapter.getInitialState({
        isFetching: false,
        changes: getEmptyChanges()
    }),
    reducers: {
        updateItem: (state, action: ActionWithIsLocal<typeof craftItemsAdapter.updateOne>) => {
            craftItemsAdapter.updateOne(state, action.payload);
            updateStateChanges(state, !!action.payload.localOnly, { updated: [action.payload.id] });
        },
        updateManyItems: (state, action: ActionArrWithIsLocal<typeof craftItemsAdapter.updateMany>) => {
            craftItemsAdapter.updateMany(state, action.payload.items)
            updateStateChanges(state, !!action.payload.localOnly, { updated: action.payload.items.map(it => it.id) });
        }
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