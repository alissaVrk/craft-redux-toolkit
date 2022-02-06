import { StoreType, SubscribeToChange } from "redux-root";
import { SocketsCommunication } from "./SocketsCommunication";
import { MySocketOptions, MySocket } from "./types";
import * as workspaceHandler from "./workspaceMessagesHandler"

export function createSocketsAPI() {
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

export function initSockets(store: StoreType, subscribeToChange: SubscribeToChange){
    const socketAPI = createSocketsAPI()
    new SocketsCommunication(store, subscribeToChange, {
        createSocket: socketAPI.createSocket
    }, {
        workspace: workspaceHandler.handleMessages
    });

    return socketAPI;
}

export function wrapMessage(type: string, data: any){
    return {
        event: type,
        data: {
            info: data
        }
    }
}