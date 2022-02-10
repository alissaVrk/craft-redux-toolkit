import { delay } from "lodash";
import { StoreType, RootState } from "redux-root";
import * as aggregatedFeatures from "./features";
import { createStore, createStoreAndSubscription } from "redux-root/store";
import { AggregatedBackEndAPI, BE_API } from "be-api"

export interface TestUtils<K extends keyof RootState> {
    getInitializedState: () => {[key in K]: RootState[key]}
}

const _featuresTestUtils = aggregatedFeatures.features;

export function waitForStateChange<T>(store: StoreType, selector: (state: RootState) => T, predicate: (state: T) => boolean){
    return  new Promise<void>((resolve, reject) => {
        const unsubscribe = store.subscribe(() => {
            const data = selector(store.getState())
            if(predicate(data)) {
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

export function mockBeApi(){
    const instance = aggregatedFeatures.getMockedBeApi();
    jest.spyOn(BE_API, "createInstance")
        .mockReturnValue(instance as unknown as AggregatedBackEndAPI)
    return instance;
}

export function getInitializedStore(initialStateOverrides?: Partial<RootState>) {
    let initialState = aggregatedFeatures.getInitializedState();
    initialState = initialStateOverrides ? {...initialState, ...initialStateOverrides} : initialState;

    return createStore(initialState);
}

export function getInitialzedStoreWithSubscruption(initialStateOverrides?: Partial<RootState>) {
    let initialState = aggregatedFeatures.getInitializedState();
    initialState = initialStateOverrides ? {...initialState, ...initialStateOverrides} : initialState;

    return createStoreAndSubscription(initialState);
}

export const featuresTestUtils = _featuresTestUtils; 