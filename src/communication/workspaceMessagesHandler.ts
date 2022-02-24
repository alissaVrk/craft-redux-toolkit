import { forOwn, groupBy } from "lodash";
import { AppDispatch } from "redux-root";
import { SocketMessage } from "./types";
import { localOnlyActions as itemsActions } from "features/craft-items"
import { transformToCraftItem } from "data-transform";

export enum MessageType {
    updateItem = "product:item:update",
    createItem = "product:item:create"
}

export function handleMessages(msgs: SocketMessage[], dispatch: AppDispatch) {
    const msgsByType = groupBy(msgs, "type");
    forOwn(msgsByType, (msgs, type) => processMessages(dispatch, msgs, type as MessageType))
}

function processMessages(dispatch: AppDispatch, msgs: SocketMessage[], type: MessageType) {
    switch(type) {
        case MessageType.updateItem:
            const updateItems = msgs.map(msg => ({id: msg.data.id, changes: transformToCraftItem(msg.data)}));
            dispatch(itemsActions.updateManyItems({items: updateItems, localOnly: true}));
            break;
        // case MessageType.createItem:
        //     const addItems = msgs.map(msg => transformToCraftItem(msg.data));
        //     dispatch(itemsActions.addManyItem(addItems));
        //     break;
        default:
            console.log("socket message not supported", type);
    }
}