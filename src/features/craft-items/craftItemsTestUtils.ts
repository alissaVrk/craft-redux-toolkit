import * as craftItemsBE from "./store/craftItemsBE";
import { CraftItem, CraftItemType } from "./store/types";
import { craftItemsSlice } from "./store/craftItemsSlice";
import { getAllItemsAsync } from "./store/craftItemsFetchers";
import { TestUtils } from "test-utils/testUtilsHelpers";
import { RootState } from "redux-root";

const defaultItems = [{ id: "i1", title: "ttt", type: CraftItemType.Feature }];


interface ItemsTestUtils extends TestUtils<"items"> {
    getInitializedState: (overrides?: CraftItem[]) => {[craftItemsSlice.name]: RootState["items"]}
    mockFetchAll: (items?: CraftItem[]) => jest.SpyInstance
}

const testUtils: ItemsTestUtils = {
    getInitializedState: (overrides) => {
        const state = craftItemsSlice.getInitialState();
        const withItems = craftItemsSlice.reducer(
            state, 
            getAllItemsAsync.fulfilled(overrides || defaultItems, "reguestItems")
        );

        return {
            [craftItemsSlice.name]: withItems
        };
    },
    mockFetchAll: (items) => {
        return jest.spyOn(craftItemsBE, "fetchAll").mockImplementation(() =>
            Promise.resolve(items || defaultItems)
        );
    }
}

export default testUtils;