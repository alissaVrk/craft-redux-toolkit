import { simpleUpdate } from "./craftItemsActions";
import { craftItemsSlice } from "./craftItemsSlice"
import { CraftItemsBE } from "./craftItemsBE"
import { registerBackendAPI, registerSlice } from "redux-root";
import { initSlice } from "./craftItemsSlice"
export { selectors } from "./craftItemsSlice";

export const actions = {
    simpleUpdate
}

export const localOnlyActions = craftItemsSlice.actions; 
export * from "./types";

registerBackendAPI("items", CraftItemsBE);
registerSlice({"items": initSlice});
