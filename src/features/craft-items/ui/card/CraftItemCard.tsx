import { EntityId } from "@reduxjs/toolkit"
import { CraftItem, selectors } from "features/craft-items"
import { useSelectionContext } from "features/craft-items/client-state/SelectionProvider"
import React from "react"
import { useAppSelector } from "redux-root"
import { CardTitleAndType } from "./CardTitleAndType"
type SupportedFields = Pick<CraftItem, "title" | "importanceId">

export function CraftItemCard(props: {
    additionalStyles?: React.CSSProperties
    itemId: EntityId,
    // fieldsToShow: Array<keyof SupportedFields> ,
}){
    const item = useAppSelector(state => selectors.selectById(state, props.itemId))
    const {useIsSelected, selectItem} = useSelectionContext();
    const selected = useIsSelected(props.itemId);



    function handleSelection(isSelected: boolean) {
        selectItem(props.itemId, isSelected);
    }

    if (!item) {
        return <div>loading...</div>
    }
    return (<div className="card-item-content" style={props.additionalStyles }>
        <CardTitleAndType 
            title={item.title} 
            type={item.type} 
            isSelected={selected} 
            onSelect={handleSelection} />
    </div>)
}