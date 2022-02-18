import { EnhancedStore, Selector} from "@reduxjs/toolkit";
import { StoreChangeListener } from "./types";

export function createSubsriber<T extends EnhancedStore>() {
    let store: T;
    type StoreState = ReturnType<T["getState"]>
    type SelectorType<Result> = Selector<StoreState, Result, never[]>;
    let prevState = {} as StoreState;

    const subscriptionsMap = new Map<SelectorType<any>, StoreChangeListener<any>[]>();

    function handlePath(selector: SelectorType<any>, listeners:StoreChangeListener<any>[], prevState: StoreState, currentState: StoreState) {
        const prev = selector(prevState);
        const current = selector(currentState)
        if (prev !== current) {
            listeners.forEach(cb => cb(current, store.dispatch));
        }
    }
    function subscribeToStoreChange<Result>(selector: SelectorType<Result>, listener: StoreChangeListener<Result>) {
        let arr = subscriptionsMap.get(selector);
        arr = arr || [];
        arr.push(listener);
        subscriptionsMap.set(selector, arr);
    }

    function subscribe(_store: T) {
        store = _store;
        //for the case that the store is initialized with values - probably what we will do in ng
        broadcast();
        return store.subscribe(() => {
           broadcast();
        });
    }

    function broadcast(){
        const currentState = store.getState();
        if (currentState === prevState) {
            return;
        }
        subscriptionsMap.forEach((listeners, selector) => 
            handlePath(selector, listeners, prevState, currentState)
        )
        prevState = currentState;
    }

    return {
        subscribe,
        subscribeToStoreChange
    };
}