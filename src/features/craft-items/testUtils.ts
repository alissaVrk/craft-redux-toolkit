import * as craftItemsBE from "./store/craftItemsBE";
import { CraftItem, CraftItemType } from "./store/types";

export function mockFetchAll(items?: CraftItem[]) {
    return jest.spyOn(craftItemsBE, "fetchAll").mockImplementation(() => 
        Promise.resolve(items || [{id: "i1", title: "ttt", type: CraftItemType.Feature}])
    );
}