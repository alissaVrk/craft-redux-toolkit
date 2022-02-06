import { forOwn, groupBy } from "lodash";
import { AppDispatch } from "redux-root";
import { SocketMessage } from "./types";
import { localOnlyActions as itemsActions } from "features/craft-items"

export enum MessageType {
    updateItem = "product:item:update"
}

export function handleMessages(msgs: SocketMessage[], dispatch: AppDispatch) {
    const msgsByType = groupBy(msgs, "type");
    forOwn(msgsByType, (msgs, type) => processMessages(dispatch, msgs, type as MessageType))
}

function processMessages(dispatch: AppDispatch, msgs: SocketMessage[], type: MessageType) {
    const dataItems = msgs.map(msg => ({id: msg.data.id, changes: msg.data}));
    switch(type) {
        case MessageType.updateItem:
            dispatch(itemsActions.updateManyItems(dataItems))
            break;
        default:
            console.log("socket message not supported", type);
    }
}