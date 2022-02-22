import { EntityId } from "@reduxjs/toolkit";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type SelectionContextType = {
    selectItem: (itemId: EntityId, isSelected: boolean) => void,
    useIsSelected: (itemId: EntityId) => boolean,
    useSelectedIds: () => EntityId[]
}

export const defaultValue = {
    selectItem: () => { },
    useIsSelected: () => false,
    useSelectedIds: () => []
} as SelectionContextType

export const SelectionContext = React.createContext(defaultValue);

function getUseIsSelected (
    selectedIds: React.MutableRefObject<Set<EntityId>>, 
    registry: React.MutableRefObject<{ [key: EntityId]: (isSelected: boolean) => void }>
){
    function useIsSelected(itemId: EntityId) {
        const [sel, setSel] = useState(selectedIds.current.has(itemId));
        useEffect(() => {
            if (registry.current[itemId]) {
                throw new Error("did not implement support for multiple components per itemId");
            }
            registry.current[itemId] = setSel;
            return () => {
                delete registry.current[itemId];
            }
        }, []);
        return sel;
    };

    return useIsSelected;
}

function getUseSelectedIds(
    initialSelectedIds: EntityId[], 
    registry: React.MutableRefObject<Set<(selectedIds: EntityId[]) => void>>
){
    return function useSelectedIds(){
        const [selectedIds, setSelectedIds] = useState(initialSelectedIds)
        useEffect(() => {
            registry.current.add(setSelectedIds);
            return () => {
                registry.current.delete(setSelectedIds);
            }
        }, [])

        return selectedIds;
    }
}
export function SelectionProvider(props: React.PropsWithChildren<{ onSelectionChanged?: (data: {ids: EntityId[], isAllSelected: boolean}) => void }>) {
    const selectedIds = useRef(new Set<EntityId>());
    const registryForSingle = useRef<{ [key: EntityId]: (isSelected: boolean) => void }>({});
    const registryForAll = useRef<Set<(selectedIds: EntityId[]) => void>>(new Set())

    const selectItem = (itemId: EntityId, isSelected: boolean) => {
        if (isSelected) {
            selectedIds.current.add(itemId);
        } else {
            selectedIds.current.delete(itemId);
        }
        registryForSingle.current[itemId]?.(isSelected);
        const selectedIdsArr = Array.from(selectedIds.current);
        registryForAll.current.forEach(setter => setter(selectedIdsArr));
        props.onSelectionChanged?.({ ids: Array.from(selectedIds.current.values()), isAllSelected: false });
    };

    const value = useMemo(() => ({
        selectItem,
        useIsSelected: getUseIsSelected(selectedIds, registryForSingle),
        useSelectedIds: getUseSelectedIds(Array.from(selectedIds.current), registryForAll)
    }), []);

    return (<SelectionContext.Provider value={value}>
        {props.children}
    </SelectionContext.Provider>)

}

export function useSelectionContext() {
    return useContext(SelectionContext);
}