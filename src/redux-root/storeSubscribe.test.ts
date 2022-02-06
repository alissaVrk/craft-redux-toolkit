import { createSlice, configureStore } from "@reduxjs/toolkit";
import {createSubsriber} from "./storeSubscribe"

describe("store subscribtion", () => {
    function getCounterSlice(name: string){
        const slice = createSlice({
            name: name,
            initialState: {value: 1},
            reducers: {
              increment: (state) => {
                state.value += 1;
              }
            }
        });

        return slice
    }
    const counterSlice1 = getCounterSlice("counter1");
    const counterSlice2 = getCounterSlice("counter2");
    function getStore(){
        return configureStore({
            reducer: {
                [counterSlice1.name]: counterSlice1.reducer,
                [counterSlice2.name]: counterSlice2.reducer
            }
        })
    }
    
    function getStoreAndSubscription(){
        const store = getStore();
        const {subscribe, subscribeToChange} = createSubsriber();
        return {store, subscribeToChange, startListening: subscribe}
    }

    it("should call listener with initial state with subscribed before start listening ", () => {
        const {store, subscribeToChange, startListening} = getStoreAndSubscription()
        const cb = jest.fn();
        subscribeToChange("counter1", cb);
        const unsubscribe = startListening(store);

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith({value: 1}, expect.anything());
        unsubscribe();
    });

    it("should not call listener with current state with subscribed after start listening",() => {
        const {store, subscribeToChange, startListening} = getStoreAndSubscription()
        const unsubscribe = startListening(store);

        const cb = jest.fn();
        subscribeToChange("counter1", cb);

        expect(cb).not.toHaveBeenCalled();
        unsubscribe();
    });

    it("should call listener when store changes with state in path", () => {
        const {store, subscribeToChange, startListening} = getStoreAndSubscription()
        const unsubscribe = startListening(store);

        const cb = jest.fn();
        subscribeToChange("counter1", cb);

        store.dispatch(counterSlice1.actions.increment());

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith({value: 2}, expect.anything());
        unsubscribe();
    });

    it("should not call listener of other part", () => {
        const {store, subscribeToChange, startListening} = getStoreAndSubscription()
        const unsubscribe = startListening(store);

        const cb = jest.fn();
        subscribeToChange("counter2", cb);

        store.dispatch(counterSlice1.actions.increment());

        expect(cb).not.toHaveBeenCalledWith();
        unsubscribe();
    });

    it("should subscribe to inner slice part", () => {
        const {store, subscribeToChange, startListening} = getStoreAndSubscription()
        const unsubscribe = startListening(store);

        const cb = jest.fn();
        subscribeToChange("counter1.value", cb);

        store.dispatch(counterSlice1.actions.increment());

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith(2, expect.anything());
        unsubscribe();
    });

    it("should call multiple listeners", () => {
        const {store, subscribeToChange, startListening} = getStoreAndSubscription()
        const unsubscribe = startListening(store);

        const cb1 = jest.fn();
        subscribeToChange("counter1.value", cb1);
        const cb2 = jest.fn();
        subscribeToChange("counter1.value", cb2);

        store.dispatch(counterSlice1.actions.increment());

        expect(cb1).toHaveBeenCalledTimes(1);
        expect(cb2).toHaveBeenCalledTimes(1);
        unsubscribe();
    })
});