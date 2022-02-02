import { useAppSelector } from "redux-root";
import { selectors } from "..";
import { ItemView } from "./ItemView";

export function ItemsList() {
    const itemIds = useAppSelector(selectors.selectIds);

    return(<ul>
        {itemIds.map(id => (
            <ItemView key={id} itemId={id} />
        ))}
    </ul>)
    
}