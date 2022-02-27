import { useAppDispatch, useAppSelector } from "redux-root";
import { selectors, actions } from "../store";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function WorkspaceSelect() {
    const { items, isFetching, selectedWorkspace } = useAppSelector(selectors.selectAllAndSelected);
    const dispatch = useAppDispatch();

    function selectItem(itemId?: string) {
        if (!itemId) {
            throw new Error("you can't select no item")
        }
        dispatch(actions.selectWorkspace(itemId));
    }

    if (isFetching) {
        return <div style={{ width: 300 }}>Loading....</div>
    }
    return (
        <FormControl sx={{ minWidth: 150}} variant="standard" size="small">
            <InputLabel id="select_ws">Select Workspace</InputLabel>

            <Select
                value={selectedWorkspace?.id}
                onChange={e => selectItem(e.target.value)}
                labelId="select_ws"
            >
                {items.map(ws => (
                    <MenuItem value={ws.id} key={ws.id}>{ws.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}