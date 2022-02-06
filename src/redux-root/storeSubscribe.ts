import { EnhancedStore } from "@reduxjs/toolkit";
import { get } from "lodash";
import { StoreChangeListener } from "./types";

export function createSubsriber<T extends EnhancedStore>() {
    const subscriptions: { [path: string]: Array<StoreChangeListener<any>> } = {};
    let store: T;
    let prevState = {} as ReturnType<T["getState"]>;

    function handlePath(path: string, prevState: ReturnType<T["getState"]>, currentState: ReturnType<T["getState"]>) {
        const prev = get(prevState, path);
        const current = get(currentState, path);
        if (prev !== current) {
            subscriptions[path].forEach(cb => cb(current, store.dispatch));
        }
    }
    function subscribeToChange<T>(path: string, listener: StoreChangeListener<T>) {
        subscriptions[path] = subscriptions[path] || [];
        subscriptions[path].push(listener);
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
        Object.keys(subscriptions).forEach(path => handlePath(path, prevState, currentState));
        prevState = currentState;
    }

    return {
        subscribe,
        subscribeToChange
    };
}