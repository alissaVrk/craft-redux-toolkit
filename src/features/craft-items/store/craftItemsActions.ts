import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxionDefaultConfig, RootState, ThunkConfig } from "redux-root";
import { updateItem } from "./craftItemsBE";
import { CraftItemUpdate } from "./types";
import { craftItemsSlice, selectors } from "./craftItemsSlice"



export const simpleUpdate = createAsyncThunk<void, CraftItemUpdate, ThunkConfig>("items/update", async (item, api) => {
    api.dispatch(craftItemsSlice.actions.updateItem({ id: item.id, changes: item }));
    const rootState: RootState = api.getState()
    const config = getAxionDefaultConfig(rootState);
    const fullItem = selectors.selectById(rootState, item.id);
    try {
        await updateItem({ ...fullItem, ...item }, config)
    } catch (err) {
        //TODO: it will be nice to get the item from the server in this case
        console.log("Error updating  " + item.id, err);
    }
});
