import { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux-root";
import { CraftItem, selectors, actions } from "../store";

export function ItemPanel({itemId}: {itemId: CraftItem["id"]}) {
    const item = useAppSelector(state => selectors.selectById(state, itemId));
    const dispatch = useAppDispatch();
    const [title, setTitile] = useState(item?.title);

    function updateItem(){
        dispatch(actions.simpleUpdate({id: itemId, title}))
    }

    return (
        <div>
            title: <input value={title} onChange={(event) => setTitile(event.target.value)}/>
            type: {item?.type}
            <button onClick={updateItem}>submit</button>
        </div>
    )
}


export type CraftItemDeprecated = {
    id: string,
    // type: CraftItemType,
    title: string,
    shortId: string,
    productId: string,
    assignedContainer: {
        id: string
    },
    custom: Array<{id: string, guid: string, value: any}>,
    globalStatus: {
        id: string
    },
    importance: {
        id: string
    },
    sprint: {
        id: string
    }
}