import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "redux-root";
import { selectors } from "..";

export function ItemView({itemId}: {itemId: EntityId}){
    const item = useAppSelector(state => selectors.selectById(state, itemId));

    return (
        <li>{item?.title}</li>
    )
}