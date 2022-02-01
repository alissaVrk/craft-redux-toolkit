import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux-root";
import { workspacesAdapter } from "./workSpaceSlice";

const itemsSelector = workspacesAdapter.getSelectors<RootState>((state) => state.workspaces);

const selectIsFetching = (state: RootState) => 
        state.workspaces.isItemsFetching || state.workspaces.isSelectedFetching

const selectSelectedWorkspace = createSelector(
    (state: RootState) => state,
    (state: RootState) => state.workspaces.selectedWorkspace,
    (state, selectedId) => selectedId ? itemsSelector.selectById(state, selectedId) : null
)

const selectAllAndSelected = createSelector(
    (state: RootState) => itemsSelector.selectAll(state),
    (state: RootState) => selectIsFetching(state),
    (state: RootState) => selectSelectedWorkspace(state),
    (items, isFetching, selectedWorkspace) => ({
        items,
        isFetching,
        selectedWorkspace
    })
)

export const selectors = {
    ...itemsSelector,
    selectIsFetching,
    selectAllAndSelected
}