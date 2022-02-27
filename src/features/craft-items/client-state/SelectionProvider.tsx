import { EntityId } from "@reduxjs/toolkit";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type SelectionContextType = {
    selectItem: (itemId: EntityId, isSelected: boolean, groupId: EntityId) => void,
    useIsSelected: (itemId: EntityId) => boolean,
    useSelectedIds: () => EntityId[]
}

export const defaultValue = {
    selectItem: () => { },
    useIsSelected: () => false,
    useSelectedIds: () => []
} as SelectionContextType

export const SelectionContext = React.createContext(defaultValue);

export function SelectionProvider({onSelectionChanged, registerToSelectItems, children}: React.PropsWithChildren<{
    onSelectionChanged?: (itemId: EntityId, groupId: EntityId, isItemSelected: boolean) => void
    registerToSelectItems?: (cb: (ids: EntityId[]) => void) => void
}>) {
    const selectedIds = useRef(new Set<EntityId>());
    const registryForSingle = useRef<Map<EntityId, (isSelected: boolean) => void >>(new Map());
    const registryForAll = useRef<Set<(selectedIds: EntityId[]) => void>>(new Set())

    useEffect(
        //this will be different when the toolbar will be in react
        function handleSelctionChangedFromToolbar() {
            registerToSelectItems?.((ids) => {
                selectedIds.current = new Set(ids);
                registryForSingle.current.forEach((setter, itemId) => setter(selectedIds.current.has(itemId)))
                notifySelectedIdsChanged();
            })
        }, [registerToSelectItems])

    const selectItem = useCallback((itemId: EntityId, isSelected: boolean, groupId: EntityId) => {
        if (isSelected) {
            selectedIds.current.add(itemId);
        } else {
            selectedIds.current.delete(itemId);
        }

        registryForSingle.current.get(itemId)?.(isSelected);
        onSelectionChanged?.(itemId, groupId, isSelected);
        notifySelectedIdsChanged();
    }, [onSelectionChanged]);

    function notifySelectedIdsChanged() {
        const selectedIdsArr = Array.from(selectedIds.current);
        registryForAll.current.forEach(setter => setter(selectedIdsArr));
    }

    const value = useMemo(() => ({
        selectItem,
        useIsSelected: getUseIsSelected(selectedIds.current, registryForSingle),
        useSelectedIds: getUseSelectedIds(Array.from(selectedIds.current), registryForAll)
    }), [selectItem]);

    return (<SelectionContext.Provider value={value}>
        {children}
    </SelectionContext.Provider>)

}

export function useSelectionContext() {
    return useContext(SelectionContext);
}

function getUseIsSelected(
    initialSelectedIds: Set<EntityId>,
    registry: React.MutableRefObject<Map<EntityId, (isSelected: boolean) => void >>
) {
    function useIsSelected(itemId: EntityId) {
        const [sel, setSel] = useState(initialSelectedIds.has(itemId));
        
        useEffect(() => {
            if (registry.current.has(itemId)) {
                throw new Error("did not implement support for multiple components per itemId");
            }
            registry.current.set(itemId, setSel);
            return () => {
                registry.current.delete(itemId);
            }
        }, [itemId]);
        return sel;
    };

    return useIsSelected;
}

function getUseSelectedIds(
    initialSelectedIds: EntityId[],
    registry: React.MutableRefObject<Set<(selectedIds: EntityId[]) => void>>
) {
    return function useSelectedIds() {
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