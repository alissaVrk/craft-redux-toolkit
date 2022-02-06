import { SocketsCommunication } from "./SocketsCommunication";
import { StoreType, SubscribeToChange } from "redux-root";
import * as workspaceHandler from "./workspaceMessagesHandler"
import Sockette from "sockette";

export function initSockets(store: StoreType, subscribeToChange: SubscribeToChange){
    const socketCommunication = new SocketsCommunication(store, subscribeToChange, {
        createSocket: (url, options) => new Sockette(url, options)
    }, {
        workspace: workspaceHandler.handleMessages
    });

    return socketCommunication;
}