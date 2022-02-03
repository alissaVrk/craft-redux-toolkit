export enum CraftItemType {
    Feature = "page",
    Epic = "topic",
    SubFeature = "subtask",
    DD= "feature",
    RR="req"

}

export type CraftItem = {
    id: string,
    type: CraftItemType,
    title: string
}

export type CraftItemUpdate = Partial<CraftItem> & {id: CraftItem["id"]};
export type CraftItemAdd = Omit<CraftItem, "id">