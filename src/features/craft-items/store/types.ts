import type { craftItemsSlice } from "./craftItemsSlice";

export enum CraftItemType {
    Product= "feature",
    Epic = "topic",
    Feature = "page",
    SubFeature = "subtask",
    Request="req"
}

export type CraftItem = {
    id: string,
    type: CraftItemType,
    title: string,
    shortId: string,
    productId: string
}

export type CraftItemUpdate = Partial<CraftItem> & {id: CraftItem["id"]};
export type CraftItemAdd = Omit<CraftItem, "id">;
export type {CraftItemsBE } from "./craftItemsBE";

export type CraftItemsState = ReturnType<typeof craftItemsSlice.reducer>;