import { BaseBackEndAPI } from "redux-root";
import { CraftItem, CraftItemUpdate } from "./types";
export class CraftItemsBE extends BaseBackEndAPI {
    async fetchAll(selectedWSId: string, userId: string) {
        const result = await this.axiosInstance.post<{data: {updated: {items: CraftItem[]}}}>("api/sync/update", {
            limit: 1000,
            productId: selectedWSId,
            skip: 0,
            storageName: "items",
            userId: userId // why the fuck do I need this?
        });
    
        return result.data.data.updated.items;
    }
    
    async updateItem(item: CraftItemUpdate) {
        const result = await this.axiosInstance.put<CraftItem>(`api/pages/${item.id}`, item);
    }
}