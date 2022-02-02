import { useAppDispatch, useAppSelector } from "redux-root";
import { selectors, actions } from "../store";
import { Listbox } from '@headlessui/react'
import { Workspace } from "../store/types";

export function WorkspaceSelect() {
    const { items, isFetching, selectedWorkspace } = useAppSelector(selectors.selectAllAndSelected);
    const dispatch = useAppDispatch();

    function selectItem(item?: Workspace){
        if (!item) {
            throw new Error("you can't select no item")
        }
        dispatch(actions.selectWorkspace(item));
    }

    if (isFetching) {
        return <div style={{ width: 300 }}>Loading....</div>
    }
    return (
        <Listbox value={selectedWorkspace} onChange={selectItem} as="div" style={{ width: 300 }}>
            <Listbox.Button style={{ width: "100%" }}>{selectedWorkspace?.name || "select"}</Listbox.Button>
            <Listbox.Options>
                {items.map(ws => (
                    <Listbox.Option key={ws.id} value={ws}>
                        {ws.name}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>)
}