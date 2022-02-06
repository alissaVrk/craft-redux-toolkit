import { AppDispatch } from "redux-root";
import Sockette, {SocketteOptions} from "sockette";

export type MySocket = Sockette;
export type MySocketOptions = SocketteOptions;

export type SocketAPI = {
    createSocket(url: string, options: MySocketOptions): MySocket
}

export type MessageHandlers = {
    workspace: (msgs: any[], dispatch: AppDispatch) => void
}