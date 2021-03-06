import { Selector } from "@reduxjs/toolkit";
import { noop } from "lodash";
import { AppDispatch, StoreChangeListener, StoreType } from "redux-root";
import { createSocketsAPI, wrapMessage } from "./communicationTestUtils";
import { buildUrl, SocketsCommunication } from "./SocketsCommunication";

function subscribeToWorkspaceChangeAndFire<T>(selector: Selector<any, T, never[]>, listener: StoreChangeListener<T>) {
    //@ts-ignore
    listener("ws1", noop as AppDispatch);
}

const mockStore = {
    dispacth: () => { },
    getState:() => ({workspaces: {}, auth: {base: {sessionId: "ny guid"}}})
} as unknown as StoreType

describe("Socket communication", () => {
    function connect() {
        const api = createSocketsAPI();
        const handler = jest.fn();

        new SocketsCommunication(
            mockStore,
            subscribeToWorkspaceChangeAndFire,
            api,
            { workspace: handler }
        );

        return { api, handler };
    }

    it("should recieve message", () => {
        jest.useFakeTimers();
        const { api, handler } = connect();

        const data = { a: 2 };
        api.sendOnSocket(buildUrl("ws1"), JSON.stringify(wrapMessage("t1", data)));
        jest.runAllTimers();

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith([{data: data, type: "t1"}], mockStore.dispatch);
    });

    it("should not handle my own messages", () => {
        jest.useFakeTimers();
        const { api, handler } = connect();

        const data = { a: 2 };
        api.sendOnSocket(buildUrl("ws1"), JSON.stringify(wrapMessage("t1", data, mockStore.getState().auth.base.sessionId)));
        jest.runAllTimers();

        expect(handler).not.toHaveBeenCalled();
    });

    it("should throttle messages", () => {
        jest.useFakeTimers();
        const { api, handler } = connect();

        const data1 = { a: 2 };
        const data2 = { a: 3 };
        const data3 = { a: 4 };
        api.sendOnSocket(buildUrl("ws1"), JSON.stringify(wrapMessage("t1", data1)));
        api.sendOnSocket(buildUrl("ws1"), JSON.stringify(wrapMessage("t1", data2)));
        jest.runAllTimers();
        api.sendOnSocket(buildUrl("ws1"), JSON.stringify(wrapMessage("t1", data3)));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith([{data:data1, type: "t1"}, {data:data2, type: "t1"}], mockStore.dispatch);
    });
});
