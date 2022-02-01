import { Workspace } from "./types";
import { workSpaceSlice } from "./workSpaceSlice"

describe("actions", () => {
    describe("select workspace", () => {
        it("should update the selected workspace", () => {
            const initialState = workSpaceSlice.getInitialState();
            const nextState = workSpaceSlice.reducer(
                initialState, 
                workSpaceSlice.actions.selectWorkspace({id: "w1"} as Workspace)
            );
            expect(nextState).toEqual({
                ...initialState,
                selectedWorkspace: "w1"
            })
        });
    });
})