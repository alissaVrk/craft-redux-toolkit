import type { CraftItemType, CraftItem } from "features/craft-items";
import { omit } from "lodash";

export type CraftItemDeprecated = {
    id: string,
    type: CraftItemType,
    title: string,
    shortId: string,
    productId: string,
    updated: string | Date,
    actualStartDate?: string | Date,
    releasedDate?: string | Date,
    actualEndDate?: string | Date,
    createdDate?: string | Date,
    complitedDate?: string | Date,
    assignedContainer?: {
        id: string
    },
    custom?: Array<{ id: string, guid: string, value: any }>,
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

type KeyOfByPropType<T, PropType, ExcludePropType = undefined> = Exclude<
    {
        [Key in keyof T]:
        T[Key] extends PropType
        ? T[Key] extends ExcludePropType ? never : Key
        : never
    }[keyof T],
    undefined>;

export const explodedFields: Array<KeyOfByPropType<
    CraftItemDeprecated,
    ({ id: string } | undefined)
>> = [
        "assignedContainer",
        "globalStatus",
        "importance",
        "sprint"
    ];
export const dateFields: Array<KeyOfByPropType<
    CraftItemDeprecated,
    (Date | string | undefined),
    (string | undefined)
>> = [
        "actualEndDate",
        "actualStartDate",
        "createdDate",
        "releasedDate",
        "updated",
        "complitedDate"
    ]
export function transformToCraftItem(item: CraftItemDeprecated): CraftItem {
    const to = omit(item,
        "assignedContainer",
        "globalStatus",
        "importance",
        "sprint",
        "productId") as unknown as CraftItem;

    to.workspaceId = item.productId;

    explodedFields.forEach(field => {
        to[`${field}Id`] = item[field]?.id
    })

    dateFields.forEach(field => {
        if (item[field] instanceof Date) {
            to[field] = (item[field] as Date).toISOString();
        } else {
            to[field] = item[field] as string | undefined
        }
    })
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

    explodedFields.forEach(field => {
        to[field] = item[`${field}Id`] ? {id: item[`${field}Id`]!} : undefined
    })

    return to;
}