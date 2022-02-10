import { actions as authActions } from "features/auth";
import { waitForStateChange, mockBeApi } from "test-utils";
import { createStore } from "redux-root/store";

describe("fetch items", () => {
    it("should fetch items after login", async () => {
        const store = createStore();
        const beApiSpies = mockBeApi()
        const fetchSpy = beApiSpies.items.fetchAll;
        expect(store.getState().items.ids.length).toBe(0);

        await store.dispatch(authActions.login({email: "ee", pass: "pp"})).unwrap();
        await waitForStateChange(store, state => state.items, items => items.ids.length > 0);

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(store.getState().items.ids.length).toBe(2);
    });

    it.todo("should clear on logout");
    it.todo("should do something if fetch fails");

    it("should update isItemsFetching state", async () => {
        const store = createStore();
        mockBeApi()
        expect(store.getState().items.isFetching).toBe(false);

        await store.dispatch(authActions.login({email: "ee", pass: "pp"})).unwrap();
        
        await waitForStateChange(store, state => state.items, items => items.isFetching);
        expect(store.getState().items.isFetching).toBe(true);

        await waitForStateChange(store, state => state.items, items => items.ids.length > 0);
        expect(store.getState().items.isFetching).toBe(false);
    });

    it.todo("should reload items when selected workspace changes");
});