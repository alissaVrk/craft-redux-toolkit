import axios, { AxiosRequestConfig } from "axios";
import { CraftItem } from "./types";

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