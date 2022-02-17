import { CraftItemType, CraftItem } from "features/craft-items";
import { omit } from "lodash";

export type CraftItemDeprecated = {
    id: string,
    type: CraftItemType,
    title: string,
    shortId: string,
    productId: string,
    assignedContainer?: {
        id: string
    },
    custom?: Array<{id: string, guid: string, value: any}>,
    globalStatus?: {
        id: string
    },
    importance?: {
        id: string
    },
    sprint?: {
        id: string
    }
}

export function transformToCraftItem(item: CraftItemDeprecated): CraftItem {
    const to = omit(item, 
        "assignedContainer", 
        "globalStatus", 
        "importance", 
        "sprint",
        "productId") as unknown as CraftItem;
    to.workspaceId = item.productId;
    to.assignedContainerId = item.assignedContainer?.id;
    to.globalStatusId = item.globalStatus?.id;
    to.importanceId = item.importance?.id;
    to.sprintId = item.sprint?.id;
    return to;
}

export function transformToDeprecatedCraftItem(item: CraftItem): CraftItemDeprecated {
    const to = omit(item, 
        "assignedContainerId",
        "globalStatusId",
        "importanceId",
        "sprintId",
        "workspaceId") as unknown as CraftItemDeprecated;

    to.productId = item.workspaceId;
    to.assignedContainer = item.assignedContainerId ? {id: item.assignedContainerId} : undefined;
    to.globalStatus = item.globalStatusId ? {id: item.globalStatusId} : undefined;
    to.importance = item.importanceId ? {id: item.importanceId}: undefined;
    to.sprint = item.sprintId ? {id: item.sprintId}: undefined;

    return to;
}