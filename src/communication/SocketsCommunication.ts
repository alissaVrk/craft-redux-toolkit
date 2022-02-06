import { subscribeToWorkspaceChanged } from "features/workspace";
import { StoreType, SubscribeToChange } from "redux-root";
import { throttle } from "lodash";
import { SocketAPI, MySocket, MessageHandlers } from "./types";

export class SocketsCommunication {
    private store;
    private socketAPI;
    private workspaceWS?: MySocket;
    private messages = cleanMessages()
    private messageHandlers;

    constructor(store: StoreType, subscribeToChange: SubscribeToChange, socketAPI: SocketAPI, handlers: MessageHandlers) {
        this.store = store;
        this.socketAPI = socketAPI;
        this.messageHandlers = handlers;
        subscribeToWorkspaceChanged(subscribeToChange, (selectedWorkspace) => {
            this.onWorkspaceChange(selectedWorkspace);
        });
    }

    private onWorkspaceChange(workspaceId: string) {
        this.workspaceWS = this.socketAPI.createSocket(buildUrl(workspaceId), {
            maxAttempts: 3,
            timeout: 1000, //1 sec
            onerror: (event) => {
                console.log("SOCKET Error",event);
            },
            onmessage: (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.messages.workspace.push(data);
                    this.throttled();
                } catch(err) {
                    console.log("SOCKET parsing error", err)
                }
            },
            onopen: () => {
                console.log("SOCKET connected");
            },
            onmaximum: () => {
                console.log("SOCKET could not connect");
            }
        });
    }

    private throttled = throttle(this.processMessages.bind(this), 3000,{
        leading: false,
        trailing:true
    })

    private processMessages () {
        const msgs = {...this.messages};
        this.messages = cleanMessages();
        this.messageHandlers.workspace(msgs.workspace, this.store.dispatch);
        console.log("SOCKET recieved", msgs);
    }
}

export const buildUrl = (workspaceId: string) => `wss://${process.env.REACT_APP_SERVER_API}/ws/ch${workspaceId}`

const cleanMessages = (): {[key in keyof MessageHandlers]: any[]} => ({
    workspace: []
});