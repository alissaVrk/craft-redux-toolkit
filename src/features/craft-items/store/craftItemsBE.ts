import { transformToCraftItem, transformToDeprecatedCraftItem, CraftItemDeprecated } from "data-transform";
import { BaseBackEndAPI } from "redux-root";
import { CraftItem, CraftItemType } from "./types";

const typeUrlPart = {
    [CraftItemType.Feature]: "pages",
    [CraftItemType.Epic]: "topics",
    [CraftItemType.Request]: "reqs",
    [CraftItemType.SubFeature]: "pages",
    [CraftItemType.Product]: "topics"
}
export class CraftItemsBE extends BaseBackEndAPI {
    async fetchAll(selectedWSId: string, userId: string) {
        const result = await this.axiosInstance.post<{data: {updated: {items: CraftItemDeprecated[]}}}>("api/sync/update", {
            limit: 1000,
            productId: selectedWSId,
            skip: 0,
            storageName: "items",
            userId: userId // why the fuck do I need this?
        });
        const deprecatedItems = result.data.data.updated.items;
        return deprecatedItems.map(it => transformToCraftItem(it));
    }

    async updateItem(item: CraftItem) {
        const deprecatedItem = transformToDeprecatedCraftItem(item);
        await this.axiosInstance.put<CraftItem>(`api/${typeUrlPart[item.type]}/${item.id}`, deprecatedItem);
    }
}