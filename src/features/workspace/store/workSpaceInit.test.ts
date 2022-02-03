import { createStore } from "redux-root/store";
import {actions} from "features/auth";
import { getSelectedWorkspaceAsync, getWorkspacesAsync } from "./workspaceFetchers";
import {waitForStateChange, features} from "test-utils"

describe("workspace slice", () => {
    
    describe("fetch items", () => {
        it("should fetch items after login", async () => {
            const store = createStore();
            features.auth.mockLogin({token: "ttt", userId: "uuu"});
            const fetchSpy = features.ws.mockFetchAll();
            expect(store.getState().workspaces.ids.length).toBe(0);
    
            await store.dispatch(actions.login({email: "ee", pass: "pp"})).unwrap();
            await waitForStateChange(store, state => state.workspaces, ws => ws.ids.length > 0);
    
            expect(fetchSpy).toHaveBeenCalledTimes(1);
            expect(store.getState().workspaces.ids.length).toBe(1);
        });
    
        it.todo("should clear on logout");
        it.todo("should do something if fetch fails");
    
        it("should update isItemsFetching state", async () => {
            const store = createStore();
            features.ws.mockFetchAll();
    
            expect(store.getState().workspaces.isItemsFetching).toBe(false);
            const promise = store.dispatch(getWorkspacesAsync()).unwrap();
            expect(store.getState().workspaces.isItemsFetching).toBe(true);
    
            await promise;
            expect(store.getState().workspaces.isItemsFetching).toBe(false);
        });
    });

    describe("fetch selected product", () => {
        beforeEach(() => {
            features.ws.mockFetchAll();
        })
        it("should fetch after login", async () => {
            const store = createStore();
            features.auth.mockLogin({token: "ttt", userId: "uuu"});
            const selectedSpy = features.ws.mockFetchSelected("ppp");
            expect(store.getState().workspaces.selectedWorkspace).toBe(null);
    
            await store.dispatch(actions.login({email: "ee", pass: "pp"})).unwrap();
            await waitForStateChange(store, state => state.workspaces, ws => ws.selectedWorkspace !== null);
    
            expect(selectedSpy).toHaveBeenCalledTimes(1);
            expect(store.getState().workspaces.selectedWorkspace).toBe("ppp");
        });

        it.todo("should clear on logout");
        it.todo("should do something if fetch fails");

        it("should update isItemsFetching state", async () => {
            const store = createStore();
            features.ws.mockFetchSelected();
    
            expect(store.getState().workspaces.isSelectedFetching).toBe(false);
            const promise = store.dispatch(getSelectedWorkspaceAsync()).unwrap();
            expect(store.getState().workspaces.isSelectedFetching).toBe(true);
    
            await promise;
            expect(store.getState().workspaces.isSelectedFetching).toBe(false);
        });
    });

})