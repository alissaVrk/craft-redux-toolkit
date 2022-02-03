import { getInitializedStore, features } from "test-utils";
import { Workspace } from "./types";
import * as wsAPI from "."

describe("actions", () => {
    describe("select workspace", () => {
        it("should update the selected workspace", async () => {
            const store = getInitializedStore(features.ws.getInitializedState({
                selected: "w1",
                items: [{id: "w1"}, {id: "w2"}] as Workspace[]
            }));
            const selected = wsAPI.selectors.selectSelectedWorkspace(store.getState());

            expect(selected?.id).toBe("w1");

            await store.dispatch(wsAPI.actions.selectWorkspace({id: "w2"} as Workspace));

            const newSelected = wsAPI.selectors.selectSelectedWorkspace(store.getState());

            expect(newSelected?.id).toBe("w2");
        });
    });
})