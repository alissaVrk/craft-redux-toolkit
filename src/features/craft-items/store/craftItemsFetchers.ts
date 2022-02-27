import { createThunkWithBE_API } from "redux-root";
import { CraftItem } from "./types";

export const getAllItemsAsync = createThunkWithBE_API<CraftItem[], void>("items/fetchAll", (_, api, beApi) => {
    const state = api.getState();
    const userId = state.auth.base.userId;
    const selectedWS = state.workspaces.selectedWorkspace;
    if (!selectedWS) {
        return Promise.reject("you really need a selected WS for this");
    }
    return beApi.items.fetchAll(selectedWS, userId);
});