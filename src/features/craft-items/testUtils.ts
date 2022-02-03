import * as craftItemsBE from "./store/craftItemsBE";
import { CraftItem, CraftItemType } from "./store/types";
import { craftItemsSlice } from "./store/craftItemsSlice";
import { getAllItemsAsync } from "./store/craftItemsInit";

const defaultItems = [{id: "i1", title: "ttt", type: CraftItemType.Feature}];

export function mockFetchAll(items?: CraftItem[]) {
    return jest.spyOn(craftItemsBE, "fetchAll").mockImplementation(() => 
        Promise.resolve(items || defaultItems)
    );
}

export function getInitializedState(){
    const state = craftItemsSlice.getInitialState();
    const withItems = craftItemsSlice.reducer(state, getAllItemsAsync.fulfilled(defaultItems, "reguestItems"));

    return {
        [craftItemsSlice.name]: withItems
    };
}
