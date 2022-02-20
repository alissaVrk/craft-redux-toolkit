import { ItemsList } from "./ItemsList";
import { ItemPanel } from "./itemPanel";
import { useState } from "react";
import type { ItemViewSettings } from "./ItemView";
import { CraftItem } from "..";

export function ItemsPage({onClick, ...rest}: Omit<ItemViewSettings, "onEdit">) {
    const [editedItemId, setEditedItemId] = useState<string>();

    const onItemClick = onClick || ((item: CraftItem) => setEditedItemId(item.id))
    return (
        <div>
            {editedItemId && <ItemPanel itemId={editedItemId} key={editedItemId} />}
            <div style={{height: 500, overflow: "scroll"}}>
                <ItemsList 
                    {...rest}
                    onClick={onItemClick}
                    onEdit={(itemId => setEditedItemId(itemId))}
                />
            </div>
        </div>
    )
}