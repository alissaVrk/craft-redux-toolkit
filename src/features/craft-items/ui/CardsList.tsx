import { selectors } from "features/craft-items";
import { useAppSelector } from "redux-root";
import { CraftItemCard } from "./card/CraftItemCard"
import * as selctionContext from "../client-state/SelectionProvider"
import { SelectionToolbar } from "./SelectionToolbar";
export function CardsList() {
    const itemIds = useAppSelector(selectors.selectIds);

    return (<div style={{ height: 500 }}>
        <selctionContext.SelectionProvider>
            <SelectionToolbar style={{ margin: 20, float: "right", width: 250 }} />
            <div style={{ float: "left" }}>
                {itemIds.map(itemId => (
                    <CraftItemCard itemId={itemId} additionalStyles={{ margin: 5 }} key={itemId} />
                ))}
            </div>
        </selctionContext.SelectionProvider>
    </div>)
}