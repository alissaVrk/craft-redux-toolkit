import { createStore } from "redux-root/store";
import {mockLogin} from "features/auth/authTestUtils"
import {actions} from "features/auth";
import { mockFetchAll, mockFetchSelected } from "../workspaceTestUtils";
import { getSelectedWorkspaceAsync, getWorkspacesAsync } from "./workspaceThunks";
import {waitForStateChange} from "test-utils"

describe("workspace slice", () => {
    
    describe("fetch items", () => {
        it("should fetch items after login", async () => {
            const store = createStore();
            mockLogin({token: "ttt", userId: "uuu"});
            const fetchSpy = mockFetchAll();
            expect(store.getState().workspaces.ids.length).toBe(0);
    
            await store.dispatch(actions.login()).unwrap();
            await waitForStateChange(store, state => state.workspaces, ws => ws.ids.length > 0);
    
            expect(fetchSpy).toHaveBeenCalledTimes(1);
            expect(store.getState().workspaces.ids.length).toBe(1);
        });
    
        it.todo("should clear on logout");
        it.todo("should do something if fetch fails");
    
        it("should update isItemsFetching state", async () => {
            const store = createStore();
            mockFetchAll();
    
            expect(store.getState().workspaces.isItemsFetching).toBe(false);
            const promise = store.dispatch(getWorkspacesAsync()).unwrap();
            expect(store.getState().workspaces.isItemsFetching).toBe(true);
    
            await promise;
            expect(store.getState().workspaces.isItemsFetching).toBe(false);
        });
    });

    describe("fetch selected product", () => {
        beforeEach(() => {
            mockFetchAll();
        })
        it("should fetch after login", async () => {
            const store = createStore();
            mockLogin({token: "ttt", userId: "uuu"});
            const selectedSpy = mockFetchSelected("ppp");
            expect(store.getState().workspaces.selectedWorkspace).toBe(null);
    
            await store.dispatch(actions.login()).unwrap();
            await waitForStateChange(store, state => state.workspaces, ws => ws.selectedWorkspace !== null);
    
            expect(selectedSpy).toHaveBeenCalledTimes(1);
            expect(store.getState().workspaces.selectedWorkspace).toBe("ppp");
        });

        it.todo("should clear on logout");
        it.todo("should do something if fetch fails");

        it("should update isItemsFetching state", async () => {
            const store = createStore();
            mockFetchSelected();
    
            expect(store.getState().workspaces.isSelectedFetching).toBe(false);
            const promise = store.dispatch(getSelectedWorkspaceAsync()).unwrap();
            expect(store.getState().workspaces.isSelectedFetching).toBe(true);
    
            await promise;
            expect(store.getState().workspaces.isSelectedFetching).toBe(false);
        });
    });

})