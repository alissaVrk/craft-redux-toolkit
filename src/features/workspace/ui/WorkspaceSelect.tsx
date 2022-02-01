import { useAppSelector } from "redux-root";
import { selectors } from "../store";
import { Listbox } from '@headlessui/react'
import { useState } from "react";
import { Workspace } from "../store/types";


export function WorkspaceSelect() {
    const workspaces = useAppSelector(selectors.selectAll);
    const isFetching = useAppSelector(selectors.selectIsFetching);

    const [selected, setSelected] = useState<Workspace>();

    if (isFetching) {
        return <div style={{width: 300}}>Loading....</div>
    }
    return (
    <Listbox value={selected} onChange={setSelected} as="div" style={{width: 300}}>
        <Listbox.Button style={{width:"100%"}}>{selected?.name || "select"}</Listbox.Button>
        <Listbox.Options>
            {workspaces.map(ws => (
            <Listbox.Option key={ws.id} value={ws}>
                {ws.name}
            </Listbox.Option>
            ))}
        </Listbox.Options>
    </Listbox>)
}