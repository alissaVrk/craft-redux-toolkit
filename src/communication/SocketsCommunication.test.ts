import { noop } from "lodash";
import { AppDispatch, StoreChangeListener, StoreType } from "redux-root";
import { buildUrl, SocketsCommunication } from "./SocketsCommunication";
import { MySocket, MySocketOptions } from "./types";

function getAPI() {
    const sockets: { [key: string]: MySocketOptions } = {}
    return {
        createSocket: (url: string, options: MySocketOptions) => {
            sockets[url] = options;
            return {} as MySocket;
        },
        sendToSocket: (url: string, data: any) => {
            const socket = sockets[url];
            socket.onmessage?.call({} as MySocket, { data } as unknown as MessageEvent);
        }
    }
}

function subscribeToWorkspaceChangeAndFire<T>(path: string, listener: StoreChangeListener<T>) {
    //@ts-ignore
    listener("ws1", noop as AppDispatch);
}

const mockStore = {
    dispacth: () => { }
} as unknown as StoreType

describe("Socket communication", () => {
    function connect() {
        const api = getAPI();
        const handler = jest.fn();

        const communication = new SocketsCommunication(
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
        api.sendToSocket(buildUrl("ws1"), JSON.stringify(data));
        jest.runAllTimers();

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith([data], mockStore.dispatch);
    });

    it("should throttle messages", () => {
        jest.useFakeTimers();
        const { api, handler } = connect();

        const data1 = { a: 2 };
        const data2 = { a: 3 };
        const data3 = { a: 4 };
        api.sendToSocket(buildUrl("ws1"), JSON.stringify(data1));
        api.sendToSocket(buildUrl("ws1"), JSON.stringify(data2));
        jest.runAllTimers();
        api.sendToSocket(buildUrl("ws1"), JSON.stringify(data3));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith([data1, data2], mockStore.dispatch);
    });
});
