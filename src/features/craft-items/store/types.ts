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
    workspaceId: string,
    assignedContainerId?: string,
    globalStatusId?: string,
    importanceId?: string,
    sprintId?: string
    actualStartDate?: string,
    updated?: string,
    releasedDate?: string,
    actualEndDate?: string,
    createdDate?: string
}

export type CraftItemUpdate = Partial<CraftItem> & {id: CraftItem["id"]};
export type CraftItemAdd = Omit<CraftItem, "id">;
export type {CraftItemsBE } from "./craftItemsBE";

export type CraftItemsState = ReturnType<typeof craftItemsSlice.reducer>;