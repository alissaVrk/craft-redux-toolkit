import * as craftItemsBE from "./store/craftItemsBE";
import { CraftItem, CraftItemType } from "./store/types";
import { craftItemsSlice } from "./store/craftItemsSlice";
import { getAllItemsAsync } from "./store/craftItemsFetchers";
import { TestUtils } from "test-utils/testUtilsHelpers";

const defaultItems = [{ id: "i1", title: "ttt", type: CraftItemType.Feature }];


interface ItemsTestUtils extends TestUtils<"items"> {
    mockFetchAll: (items?: CraftItem[]) => jest.SpyInstance
}

const testUtils: ItemsTestUtils = {
    getInitializedState: () => {
        const state = craftItemsSlice.getInitialState();
        const withItems = craftItemsSlice.reducer(state, getAllItemsAsync.fulfilled(defaultItems, "reguestItems"));

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