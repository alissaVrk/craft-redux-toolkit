import { useAppSelector } from "redux-root";
import { CraftItem, selectors } from "..";
import { ItemView } from "./ItemView";
import { ItemPanel } from "./itemPanel"
import { useState } from "react";

export function ItemsList() {
    const [selectedItem, setSelectedItem] = useState<CraftItem["id"]>();
    const itemIds = useAppSelector(selectors.selectIds);

    return (<>
        {selectedItem && <ItemPanel key={selectedItem} itemId={selectedItem}/> }
        <ul>
            {itemIds.map(id => (
                <ItemView key={id} itemId={id as CraftItem["id"]} onSelect={setSelectedItem}/>
            ))}
        </ul>
    </>)

}