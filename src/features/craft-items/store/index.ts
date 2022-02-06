import { simpleUpdate } from "./craftItemsActions";
import { craftItemsSlice } from "./craftItemsSlice"

export { initSlice, selectors } from "./craftItemsSlice";

export const actions = {
    simpleUpdate
}

export const localOnlyActions = craftItemsSlice.actions; 
export * from "./types";