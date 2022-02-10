import { createStore } from "redux-root/store";
import * as auth from "features/auth";
import * as wsFetchActions from "./workspaceFetchers"
import {waitForStateChange,  mockBeApi} from "test-utils"

describe("workspace slice", () => {
    describe("fetch items", () => {
        it("should fetch items after login", async () => {
            const store = createStore();
            const mockedBeAPI = mockBeApi();
            const fetchSpy = mockedBeAPI.workspace.fetchAll;
            expect(store.getState().workspaces.ids.length).toBe(0);
    
            await store.dispatch(auth.actions.login({email: "ee", pass: "pp"})).unwrap();
            await waitForStateChange(store, state => state.workspaces, ws => ws.ids.length > 0);
    
            expect(fetchSpy).toHaveBeenCalledTimes(1);
            expect(store.getState().workspaces.ids.length).toBe(1);
        });

        it.todo("should clear on logout");
        it.todo("should do something if fetch fails");
    
        it("should update isItemsFetching state", async () => {
            const store = createStore();
            const mockedBeAPI = mockBeApi();
            mockedBeAPI.workspace.fetchAll;

            expect(store.getState().workspaces.isItemsFetching).toBe(false);
            const promise = store.dispatch(wsFetchActions.getWorkspacesAsync()).unwrap();
            expect(store.getState().workspaces.isItemsFetching).toBe(true);
    
            await promise;
            expect(store.getState().workspaces.isItemsFetching).toBe(false);
        });
    });

    describe("fetch selected product", () => {
        it("should fetch after login", async () => {
            const store = createStore();
            const mockedBeAPI = mockBeApi();
            const selectedSpy = mockedBeAPI.workspace.fetchSelectedWorkspace.mockResolvedValue("ppp")
            expect(store.getState().workspaces.selectedWorkspace).toBe(null);
    
            await store.dispatch(auth.actions.login({email: "ee", pass: "pp"})).unwrap();
            await waitForStateChange(store, state => state.workspaces, ws => ws.selectedWorkspace !== null);
    
            expect(selectedSpy).toHaveBeenCalledTimes(1);
            expect(store.getState().workspaces.selectedWorkspace).toBe("ppp");
        });

        it.todo("should clear on logout");
        it.todo("should do something if fetch fails");

        it("should update isItemsFetching state", async () => {
            const store = createStore();
            mockBeApi();
    
            expect(store.getState().workspaces.isSelectedFetching).toBe(false);
            const promise = store.dispatch(wsFetchActions.getSelectedWorkspaceAsync()).unwrap();
            expect(store.getState().workspaces.isSelectedFetching).toBe(true);
    
            await promise;
            expect(store.getState().workspaces.isSelectedFetching).toBe(false);
        });
    });

})