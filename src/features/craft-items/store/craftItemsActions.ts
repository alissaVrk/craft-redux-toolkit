import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxionDefaultConfig, RootState, ThunkConfig } from "redux-root";
import * as craftItemsBE from "./craftItemsBE";
import { craftItemsSlice } from "./craftItemsSlice"
import { CraftItemUpdate, selectors } from ".";

async function updateBE(rootState: RootState, item: CraftItemUpdate){
    const config = getAxionDefaultConfig(rootState);
    const fullItem = selectors.selectById(rootState, item.id);
    try {
        await craftItemsBE.updateItem({ ...fullItem, ...item }, config)
    } catch (err) {
        //TODO: it will be nice to get the item from the server in this case

        console.log("Error updating  " + item.id, err);
    }
}

export const simpleUpdate = createAsyncThunk<void, CraftItemUpdate, ThunkConfig>("items/update", async (item, api) => {
    api.dispatch(craftItemsSlice.actions.updateItem({ id: item.id, changes: item }));
    updateBE(api.getState(), item);
});

