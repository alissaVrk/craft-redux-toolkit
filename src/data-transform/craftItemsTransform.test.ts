import { CraftItemType } from "features/craft-items";
import { CraftItemDeprecated, transformToCraftItem, transformToDeprecatedCraftItem } from "./craftItemsTransform"
describe("craft items transform", () => {
    const explodedFields = ["assignedContainer", "globalStatus", "importance", "sprint"];
    function getBasicDeprecatedItem() {
        return {
            id: "id",
            type: CraftItemType.Product,
            title: "some title",
            shortId: "SH-id",
            productId: "p1",
        } as CraftItemDeprecated
    }
    function getBasicItem() {
        return {
            id: "id",
            type: CraftItemType.Product,
            title: "some title",
            shortId: "SH-id",
            workspaceId: "p1",
        }
    }
    describe("to item", () => {
        it("should transform basic item", () => {
            const deprecatedItem = getBasicDeprecatedItem();
            const item = transformToCraftItem(deprecatedItem);
            expect(item).toEqual(getBasicItem()); 
        });

        it("should transform full item", () => {
            const deprecated = getBasicDeprecatedItem();
            explodedFields.forEach((field) => {
                //@ts-ignore
                deprecated[field] = {id: `${field}_id`, someShit: "asd"}
            });
            const expectedItem = getBasicItem();
            explodedFields.forEach((field) => {
                //@ts-ignore
                expectedItem[`${field}Id`] = `${field}_id`
            });

            const item = transformToCraftItem(deprecated);
            expect(item).toEqual(expectedItem);
        });
    });

    describe("to deprecated", () => {
        it("should transform basic item", () => {
            const item = getBasicItem();
            const deprecatedItem = transformToDeprecatedCraftItem(item);
            expect(deprecatedItem).toEqual(getBasicDeprecatedItem()); 
        });

        it("should transform full item", () => {
            const item = getBasicItem();
            explodedFields.forEach((field) => {
                //@ts-ignore
                item[`${field}Id`] = `${field}_id`
            });
            const expectedItem = getBasicDeprecatedItem();
            explodedFields.forEach((field) => {
                //@ts-ignore
                expectedItem[field] = {id: `${field}_id`}
            });

            const deprecatedItem = transformToDeprecatedCraftItem(item);
            expect(deprecatedItem).toEqual(expectedItem);
        });
    });
})