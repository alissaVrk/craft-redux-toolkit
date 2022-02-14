import { ReactNode } from "react";
import { useAppSelector } from "redux-root";
import { CraftItem, selectors } from "..";

export function ItemView({itemId, itemUrlBuilder, onClick}: {
    itemId: CraftItem["id"], 
    itemUrlBuilder?: (item: CraftItem) => string,
    onClick?: (item: CraftItem) => void
}){
    const item = useAppSelector(state => selectors.selectById(state, itemId));
    const itemUrl = item && itemUrlBuilder && itemUrlBuilder(item);

    if (!item) {
        return <li></li>
    }

    function wrapWithLink(content: ReactNode) {
        return (
            <a href={itemUrl} onClick={(e) => e.preventDefault()}>
                {content}
            </a>
        )
    }
    return (
        <li onClick={() => {onClick?.(item)}}>
            {itemUrlBuilder? wrapWithLink(item.title) : item.title}
        </li>
    )
}