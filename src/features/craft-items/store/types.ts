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
    title: string
}

export type CraftItemUpdate = Partial<CraftItem> & {id: CraftItem["id"]};
export type CraftItemAdd = Omit<CraftItem, "id">