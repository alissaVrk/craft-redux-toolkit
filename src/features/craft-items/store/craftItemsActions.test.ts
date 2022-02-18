import { createSelector, EntityId } from "@reduxjs/toolkit";
import { RootState, StoreType } from "redux-root";
import { getInitializedStore, mockBeApi } from "test-utils";
import { selectors, actions } from ".";
import { selectChanges } from "./craftItemsSelectors";

describe("async actions", () => {
    describe("simple update", () => {
        function getSomeItemId(store: StoreType) {
            const items = selectors.selectAll(store.getState())
            const item = items[0];
            return item.id;
        }
        it("should update item title and send request to server", async () => {
            const beApiSpies = mockBeApi();
            const updateSpy = beApiSpies.items.updateItem;

            const store = getInitializedStore();
            const itemId = getSomeItemId(store);

            store.dispatch(actions.simpleUpdate({ id: itemId, title: "my fency" }));
            const updatedState = store.getState()
            const updatedItem = selectors.selectById(updatedState, itemId);

            expect(updatedItem?.title).toBe("my fency");
            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).toHaveBeenLastCalledWith(updatedItem);

            store.dispatch(actions.simpleUpdate({ id: itemId, title: "my fency" }));
        });

        it("should change store state once once", () => {
            mockBeApi();
            const store = getInitializedStore();
            const itemId = getSomeItemId(store);
            let initial = store.getState();
            let counter = 0
            const listener = jest.fn(() => {
                if (store.getState() !== initial) {
                    counter = counter + 1;
                }
                initial = store.getState()
            });
            store.subscribe(listener);

            store.dispatch(actions.simpleUpdate({ id: itemId, title: "my fency" }));

            expect(counter).toBe(1);
        })

        describe("changes", () => {
            beforeEach(() => {
                mockBeApi();
            });

            function getExpectedChanges(updated: EntityId[], versionDiff: number) {
                return {
                    localOnly: false,
                    added: [],
                    removed: [],
                    updated: updated,
                    version: 1 + versionDiff
                }
            }

            it("should update changes object accordingly", () => {
                const store = getInitializedStore();
                const itemId = getSomeItemId(store);

                store.dispatch(actions.simpleUpdate({ id: itemId, title: "my fency" }));

                expect(selectChanges(store.getState())).toEqual(getExpectedChanges([itemId], 1));
            });

            it("should update changes object even if same value passed - a new entity is created", () => {
                const store = getInitializedStore();
                const itemId = getSomeItemId(store);

                const selectItem = (state: RootState) => selectors.selectById(state, itemId)

                const prevItem = selectItem(store.getState());
                store.dispatch(actions.simpleUpdate({ id: itemId, title: "my fency" }));
                expect(selectChanges(store.getState())).toEqual(getExpectedChanges([itemId], 1));
                const item1 = selectItem(store.getState());
                expect(item1).not.toBe(prevItem);
                
                store.dispatch(actions.simpleUpdate({ id: itemId, title: "my fency" }));
                expect(selectChanges(store.getState())).toEqual(getExpectedChanges([itemId], 2));
                const item2 = selectItem(store.getState());
                expect(item2).not.toBe(item1);

                //sanity
                const item3 = selectItem(store.getState());
                expect(item3).toBe(item2);
            });

            test("example for using version to know if we skipped an update", () => {
                const store = getInitializedStore();
                const itemId = getSomeItemId(store);

                const heavyCalculation = jest.fn().mockReturnValue(3);
                const itemsVersion = createSelector(
                    (state: RootState) => state.items.changes,
                    (changes) => changes.version
                )

                const heavySelector = createSelector(
                    () => itemsVersion.lastResult(),
                    (state: RootState) => itemsVersion(state),
                    (prevVersion, currentVersion) => {
                        if (!prevVersion || prevVersion + 1 < currentVersion) {
                            heavyCalculation()
                        }
                    }
                )

                heavySelector(store.getState());
                expect(heavyCalculation).toBeCalledTimes(1);
                heavyCalculation.mockReset()

                //version updated by one
                store.dispatch(actions.simpleUpdate({ id: itemId, title: "my fency" }));
                heavySelector(store.getState());
                expect(heavyCalculation).toBeCalledTimes(0);

                //version updated by 2
                store.dispatch(actions.simpleUpdate({ id: itemId, title: "my fency" }));
                store.dispatch(actions.simpleUpdate({ id: itemId, title: "my fency" }));
                heavySelector(store.getState());
                expect(heavyCalculation).toBeCalledTimes(1);
            })
        })

    });
});