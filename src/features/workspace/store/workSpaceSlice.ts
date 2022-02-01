import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { defer } from "lodash";
import { SubscribeToChange, ThunkConfig, getAxionDefaultConfig, RootState } from "redux-root";
import { subscribeToUserChanged } from "features/auth"
import { fetchAll } from "./workspaceBE";
import { Workspace } from "./types";

export const fetchWorkSpaces = createAsyncThunk<Array<Workspace>, void, ThunkConfig>("workspaces", (state, thunkAPI) => {
    const config = getAxionDefaultConfig(thunkAPI.getState())
    return fetchAll(config);
});

const workspacesAdapter = createEntityAdapter<Workspace>();

export const workSpaceSlice = createSlice({
    name: "workspaces",
    initialState: workspacesAdapter.getInitialState({
        isFetching: false
    }),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchWorkSpaces.fulfilled, (state, action) => {
            workspacesAdapter.setAll(state, action.payload);
            state.isFetching = false;
        });
        builder.addCase(fetchWorkSpaces.pending, (state) => {
            return {
                ...state,
                isFetching: true
            };
        });
    }
})

export const selectors = workspacesAdapter.getSelectors<RootState>((state) => state.workspaces);

export function initSlice({ subscribeToStoreChange }: { subscribeToStoreChange: SubscribeToChange }) {
    subscribeToUserChanged(subscribeToStoreChange, (state, dispatch) => {
        if (!state.token) {
            return;
        }
        defer(() => dispatch(fetchWorkSpaces()));
    });
    return {
        reducer: workSpaceSlice.reducer,
        name: workSpaceSlice.name
    }
}