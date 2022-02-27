import { useAppSelector } from "redux-root";
import { CraftItem, selectors } from "../store";
import { ItemView, ItemViewSettings } from "./ItemView";

export function ItemsList(itemSettings: ItemViewSettings) {
    const itemIds = useAppSelector(selectors.selectIds);
    
    return (
        <ul>
            {itemIds.map(id => (
                <ItemView 
                    key={id} 
                    itemId={id as CraftItem["id"]} 
                    {...itemSettings}
                />
            ))}
        </ul>
    )

}