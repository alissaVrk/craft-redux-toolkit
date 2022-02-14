import { useAppSelector } from "redux-root";
import { CraftItem, selectors } from "..";
import { ItemView } from "./ItemView";

export function ItemsList({itemUrlBuilder, onClick}: {
    itemUrlBuilder?: (item: CraftItem) => string,
    onClick?: (item: CraftItem) => void
}) {
    const itemIds = useAppSelector(selectors.selectIds);
    
    return (<>
        <ul>
            {itemIds.map(id => (
                <ItemView 
                    key={id} 
                    itemId={id as CraftItem["id"]} 
                    itemUrlBuilder={itemUrlBuilder}
                    onClick={onClick}
                />
            ))}
        </ul>
    </>)

}