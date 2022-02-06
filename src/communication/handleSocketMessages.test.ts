import { initSockets, wrapMessage } from "./communicationTestUtils";
import { getInitialzedStoreWithSubscruption } from "test-utils"
import { selectors as itemsSelectors } from "features/craft-items";
import { selectors as wsSelectors } from "features/workspace";
import { MessageType } from "./workspaceMessagesHandler";
import { buildUrl } from "./SocketsCommunication";
import { isDate } from "lodash";

describe("handle socket messages", () => {

    function initStuff(){
        const { store, subscribeToChange } = getInitialzedStoreWithSubscruption();
        const socketsApi = initSockets(store, subscribeToChange);
        const itemIds = itemsSelectors.selectIds(store.getState());
        const ws = wsSelectors.selectSelectedWorkspace(store.getState());

        return {socketsApi, store, socketUrl: buildUrl(ws!.id), itemIds}
    }

    it("should update item", () => {
        jest.useFakeTimers();
        const {socketsApi, store, socketUrl, itemIds} = initStuff();
        const itemId = itemIds[0];

        const msg = wrapMessage(MessageType.updateItem, {
            id: itemId,
            title: "new title"
        });

        socketsApi.sendToSocket(socketUrl, JSON.stringify(msg));
        jest.runAllTimers();

        const item = itemsSelectors.selectById(store.getState(), itemId);
        expect(item?.title).toBe("new title");
    });

    it("should update multiple items",() => {
        jest.useFakeTimers();
        const {socketsApi, store, socketUrl, itemIds} = initStuff();
        expect(itemIds.length).toBeGreaterThan(1);

        const msgs = itemIds.map(id => wrapMessage(MessageType.updateItem, {
            id: id,
            title: "new title_" + id
        }));

        itemIds.forEach((id, index) => socketsApi.sendToSocket(socketUrl, JSON.stringify(msgs[index])));
        jest.runAllTimers();

        const items = itemsSelectors.selectAll(store.getState());
        items.forEach(item => expect(item.title).toBe("new title_" + item.id));
    });

    it("should throw for undefined data for unsupported types", () => {
        jest.useFakeTimers();
        const {socketsApi, store, socketUrl, itemIds} = initStuff();

        socketsApi.sendToSocket(socketUrl, JSON.stringify({data: {}, event: "other"}));
        jest.runAllTimers();
    })
});