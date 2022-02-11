import { CraftItem, CraftItemType, CraftItemsBE } from "./store/types";
import { craftItemsSlice } from "./store/craftItemsSlice";
import { getAllItemsAsync } from "./store/craftItemsFetchers";
import type { TestUtils } from "test-utils";
import { RootState } from "redux-root";

const defaultItems = [
    { id: "i1", title: "ttt", type: CraftItemType.Feature },
    { id: "i2", title: "fff", type: CraftItemType.Feature }
];

export function getMockedItemsBE(): Record<keyof CraftItemsBE, jest.Mock>{
    return {
        fetchAll: jest.fn().mockResolvedValue([...defaultItems]),
        updateItem: jest.fn().mockResolvedValue(undefined)
    }
}
export class ItemsTestUtils implements TestUtils<"items"> {
    getInitializedState(): {[craftItemsSlice.name]: RootState["items"]}
    getInitializedState(overrides: CraftItem[]): {[craftItemsSlice.name]: RootState["items"]}
    getInitializedState(overrides?: CraftItem[]) {
        const state = craftItemsSlice.getInitialState();
        const withItems = craftItemsSlice.reducer(
            state, 
            getAllItemsAsync.fulfilled(overrides || defaultItems, "reguestItems")
        );

        return {
            [craftItemsSlice.name]: withItems
        };
    }
}

export const craftItemTestUtils = new ItemsTestUtils();