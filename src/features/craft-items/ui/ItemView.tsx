import { ReactNode } from "react";
import { useAppSelector } from "redux-root";
import { CraftItem, selectors } from "..";

export type ItemViewSettings = {
    itemUrlBuilder?: (item: CraftItem) => string,
    onClick?: (item: CraftItem) => void,
    onEdit?: (itemId: string) => void
}

export function ItemView({itemId, itemUrlBuilder, onClick, onEdit}: ItemViewSettings & {
    itemId: CraftItem["id"], 
}){
    const item = useAppSelector(state => selectors.selectById(state, itemId));
    const itemUrl = item && itemUrlBuilder && itemUrlBuilder(item);

    if (!item) {
        return <li></li>
    }

    function wrapWithLink(content: ReactNode) {
        return (
            <a href={itemUrl} onClick={(e) => {e.preventDefault(); onClick?.(item!)}}>
                {content}
            </a>
        )
    }
    return (
        <li>
            <button onClick={() => onEdit?.(item.id)} style={{padding: 5, backgroundColor: "pink"}}>edit</button>
            {itemUrlBuilder? wrapWithLink(item.title) : item.title}
        </li>
    )
}