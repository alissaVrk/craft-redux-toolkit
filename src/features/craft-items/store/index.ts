import { simpleUpdate } from "./craftItemsActions";
import { craftItemsSlice } from "./craftItemsSlice"
import { CraftItemsBE } from "./craftItemsBE"
import { registerBackendAPI, registerSlice } from "redux-root";
import { initSlice, selectors as entitySelectors } from "./craftItemsSlice"
import * as customSelectors from "./craftItemsSelectors"
export const selectors = {
    ...entitySelectors,
    ...customSelectors
}


export const actions = {
    simpleUpdate
}

export const localOnlyActions = craftItemsSlice.actions; 
export * from "./types";

registerBackendAPI("items", CraftItemsBE);
registerSlice({"items": initSlice});
