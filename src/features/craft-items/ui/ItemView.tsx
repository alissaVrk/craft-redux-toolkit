import { useAppSelector } from "redux-root";
import { CraftItem, selectors } from "..";

export function ItemView({itemId, onSelect}: {itemId: CraftItem["id"], onSelect: (id: CraftItem["id"]) => void}){
    const item = useAppSelector(state => selectors.selectById(state, itemId));

    return (
        <li onClick={() => onSelect(itemId)}>{item?.title}</li>
    )
}