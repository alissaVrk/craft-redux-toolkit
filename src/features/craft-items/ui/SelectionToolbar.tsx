import React from "react";
import { useSelectionContext } from "../client-state/SelectionProvider";

export function SelectionToolbar(props: React.HTMLAttributes<HTMLDivElement>){
    const { useSelectedIds } = useSelectionContext();
    const selectedIds = useSelectedIds();

    return (
        <div {...props}>
            <h4>all selected Items</h4>
            <p>total number is {selectedIds.length}</p>
            <p>item ids {selectedIds.join(" ")}</p>
        </div>
    );
}