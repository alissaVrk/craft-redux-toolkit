import { createStore } from "redux-root/store";
import {mockLogin} from "features/auth/authTestUtils"
import {actions} from "features/auth";
import { mockFetchAll } from "../workspaceTestUtils";
import { delay } from "lodash";
import { StoreType } from "redux-root";
import { fetchWorkSpaces } from "./workSpaceSlice";

describe("workspace slice", () => {
    function waitForWorkspaceItems(store: StoreType){
        return  new Promise<void>((resolve, reject) => {
            const unsubscribe = store.subscribe(() => {
                const ws = store.getState().workspaces
                if(ws.ids.length > 0) {
                    unsubscribe();
                    resolve();
                }
            });
            delay(() => {
                unsubscribe(),
                reject()
            }, 100);
        });
    }
    it("should fetch items after login", async () => {
        const store = createStore();
        mockLogin({token: "ttt", userId: "uuu"});
        const fetchSpy = mockFetchAll();
        expect(store.getState().workspaces.ids.length).toBe(0);

        await store.dispatch(actions.login()).unwrap();
        await waitForWorkspaceItems(store);

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(store.getState().workspaces.ids.length).toBe(1);
    });

    it.todo("should clear on logout");
    it.todo("should do something if fetch fails");

    it("should update isFetching state", async () => {
        const store = createStore();
        mockFetchAll();

        expect(store.getState().workspaces.isFetching).toBe(false);
        const promise = store.dispatch(fetchWorkSpaces()).unwrap();
        expect(store.getState().workspaces.isFetching).toBe(true);

        await promise;
        expect(store.getState().workspaces.isFetching).toBe(false);
    })
})