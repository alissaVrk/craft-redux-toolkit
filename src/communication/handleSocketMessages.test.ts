import { initSockets, wrapMessage } from "./communicationTestUtils";
import { getInitialzedStoreWithSubscruption } from "test-utils"
import { selectors as itemsSelectors } from "features/craft-items";
import { selectors as wsSelectors } from "features/workspace";
import { MessageType } from "./workspaceMessagesHandler";
import { buildUrl } from "./SocketsCommunication";

describe("handle socket messages", () => {
    it("should update item", () => {
        jest.useFakeTimers();
        const { store, subscribeToChange } = getInitialzedStoreWithSubscruption();
        const socketsApi = initSockets(store, subscribeToChange);
        const currentItems = itemsSelectors.selectIds(store.getState());
        const itemId = currentItems[0];
        const ws = wsSelectors.selectSelectedWorkspace(store.getState());

        const msg = wrapMessage(MessageType.updateItem, {
            id: itemId,
            title: "new title"
        });

        socketsApi.sendToSocket(buildUrl(ws!.id), JSON.stringify(msg));
        jest.runAllTimers();

        const item = itemsSelectors.selectById(store.getState(), itemId);
        expect(item?.title).toBe("new title");
    })
});