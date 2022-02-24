import { EntityId } from "@reduxjs/toolkit";
import { itemSelectionContext } from "features/craft-items";
import React from "react";
declare global {
    interface Window {
        ngClientStateService: {
            onSelectItemChange: (cb: (e: any, data: {data: {ids: EntityId[], isAllSelected: boolean}}) => void) => void
            updateGroupSelectionAndNotify: (itemId: EntityId, groupId: EntityId, isItemSelected: boolean) => void
        }
    }
  }
function updateSelection(...args: Parameters<typeof window.ngClientStateService.updateGroupSelectionAndNotify>){
    window.ngClientStateService.updateGroupSelectionAndNotify(...args);
}

function registerToSelectItems(cb: (ids: EntityId[]) => void) {
    window.ngClientStateService.onSelectItemChange(function(e, {data: {ids}}) {
        cb(ids);
    })
}

export function SelectionProviderWithNG(props: React.PropsWithChildren<any>){
    return (<itemSelectionContext.SelectionProvider 
        onSelectionChanged={updateSelection}
        registerToSelectItems={registerToSelectItems}
    >
        {props.children}
    </itemSelectionContext.SelectionProvider>)
}