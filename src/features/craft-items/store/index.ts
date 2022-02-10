import { simpleUpdate } from "./craftItemsActions";
import { craftItemsSlice } from "./craftItemsSlice"
import { CraftItemsBE } from "./craftItemsBE"
import { registerBackendAPI } from "be-api";
export { initSlice, selectors } from "./craftItemsSlice";

export const actions = {
    simpleUpdate
}

export const localOnlyActions = craftItemsSlice.actions; 
export * from "./types";

registerBackendAPI("items", CraftItemsBE);
