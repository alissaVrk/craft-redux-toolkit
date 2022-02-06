import { delay } from "lodash";
import { StoreType, RootState } from "redux-root";
import * as aggregatedFeatures from "./features";
import { createStore, createStoreAndSubscription } from "redux-root/store";

const featuresTestUtils = aggregatedFeatures.features;

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


export function mockDefaults(){
    featuresTestUtils.auth.mockLogin({userId:"sd", token: "tt" });
    featuresTestUtils.ws.mockFetchAll();
    featuresTestUtils.ws.mockFetchSelected();
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

export const features = featuresTestUtils; 