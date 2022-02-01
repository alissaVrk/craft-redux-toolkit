import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defer } from "lodash";
import { SubscribeToChange } from "redux-root";
import { subscribeToUserChanged } from "features/auth"
import { Workspace } from "./types";
import { getSelectedWorkspaceAsync, getWorkspacesAsync } from "./workspaceThunks";

export const workspacesAdapter = createEntityAdapter<Workspace>();

export const workSpaceSlice = createSlice({
    name: "workspaces",
    initialState: workspacesAdapter.getInitialState({
        isItemsFetching: false,
        isSelectedFetching: false,
        selectedWorkspace: null as null | string
    }),
    reducers: {
        selectWorkspace: (state, action: PayloadAction<Workspace>) => {
            return {
                ...state,
                selectedWorkspace: action.payload.id
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getWorkspacesAsync.fulfilled, (state, action) => {
            workspacesAdapter.setAll(state, action.payload);
            state.isItemsFetching = false;
        });
        builder.addCase(getWorkspacesAsync.pending, (state) => {
            state.isItemsFetching = true
        });
        builder.addCase(getSelectedWorkspaceAsync.pending, (state) => {
            state.isSelectedFetching = true;
        })
        builder.addCase(getSelectedWorkspaceAsync.fulfilled, (state, action) => {
            state.selectedWorkspace = action.payload;
            state.isSelectedFetching = false;
        })
    }
})

export function initSlice({ subscribeToStoreChange }: { subscribeToStoreChange: SubscribeToChange }) {
    subscribeToUserChanged(subscribeToStoreChange, (state, dispatch) => {
        if (!state.token) {
            return;
        }
        defer(() => {
            dispatch(getWorkspacesAsync())
            dispatch(getSelectedWorkspaceAsync())
        });
    });
    return {
        reducer: workSpaceSlice.reducer,
        name: workSpaceSlice.name
    }
}