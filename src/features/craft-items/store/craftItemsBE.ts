import axios, { AxiosRequestConfig } from "axios";
import { BaseBackEndAPI } from "be-api";
import { CraftItem, CraftItemUpdate } from "./types";

export async function fetchAll(selectedWSId: string, userId: string, config: AxiosRequestConfig) {
    const result = await axios.post<{data: {updated: {items: CraftItem[]}}}>("api/sync/update", {
        limit: 1000,
        productId: selectedWSId,
        skip: 0,
        storageName: "items",
        userId: userId // why the fuck do I need this?
    },
        config
    );

    return result.data.data.updated.items;
}

export async function updateItem(item: CraftItemUpdate, config: AxiosRequestConfig) {
    const result = await axios.put<CraftItem>(`api/pages/${item.id}`, item, config);
}

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