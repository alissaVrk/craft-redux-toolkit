import { ItemsList } from "./ItemsList";
import { ItemPanel } from "./itemPanel";
import { CraftItem } from "..";
import { useState } from "react";

export function ItemsPage() {
    const [editedItemId, setEditedItemId] = useState<string>();

    function openEditItem(item: CraftItem) {
        setEditedItemId(item.id);
    }
    return (
        <div>
            {editedItemId && <ItemPanel itemId={editedItemId} />}
            <ItemsList onClick={openEditItem} />
        </div>
    )
}