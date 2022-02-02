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