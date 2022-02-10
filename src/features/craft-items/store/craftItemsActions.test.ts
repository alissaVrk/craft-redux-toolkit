import { getInitializedStore, mockBeApi } from "test-utils";
import { selectors, actions } from ".";

describe("async actions", () => {
    describe("simple update", () => {
        it("should update item title and send request to server", async () => {
            const beApiSpies = mockBeApi();
            const updateSpy = beApiSpies.items.updateItem;

            const store = getInitializedStore();
            const items = selectors.selectAll(store.getState())
            const item = items[0];

            store.dispatch(actions.simpleUpdate({id: item.id, title: "my fency"}));
            
            const updatedState = store.getState()
            const updatedItem = selectors.selectById(updatedState, item.id);

            expect(updatedItem?.title).toBe("my fency");
            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).toHaveBeenLastCalledWith(updatedItem);
        });
    });
});