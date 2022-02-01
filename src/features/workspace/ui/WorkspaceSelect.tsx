import { useAppSelector } from "redux-root";
import { selectors } from "../store";
import { Listbox } from '@headlessui/react'
import { useState } from "react";


export function WorkspaceSelect() {
    const workspaces = useAppSelector(selectors.selectAll);
    const [selected, setSelected] = useState();

    return (
    <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button>select</Listbox.Button>
        <Listbox.Options>
            {workspaces.map(ws => (
            <Listbox.Option key={ws.id} value={ws}>
                {ws.name}
            </Listbox.Option>
            ))}
        </Listbox.Options>
    </Listbox>)
}