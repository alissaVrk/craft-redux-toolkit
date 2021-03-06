import { createThunkWithBE_API, RootState } from "redux-root";
import { craftItemsSlice, selectors } from "./craftItemsSlice"
import { AggregatedBackEndAPI } from "redux-root";
import { CraftItemUpdate } from "./types";

async function updateBE(rootState: RootState, item: CraftItemUpdate, beAPI: AggregatedBackEndAPI){
    const fullItem = selectors.selectById(rootState, item.id);
    if (!fullItem) {
        throw new Error("you tried to update non existing item " + item.id);
    }
    try {
        await beAPI.items.updateItem({ ...fullItem, ...item })
    } catch (err) {
        //TODO: it will be nice to get the item from the server in this case

        console.log("Error updating  " + item.id, err);
    }
}

export const simpleUpdate = createThunkWithBE_API<void, CraftItemUpdate>("items/update", async (item, api, beAPI) => {
    api.dispatch(craftItemsSlice.actions.updateItem({ id: item.id, changes: item }));
    updateBE(api.getState(), item, beAPI);
});

