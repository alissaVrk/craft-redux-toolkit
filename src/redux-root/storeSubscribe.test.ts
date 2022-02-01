import { createSlice, configureStore } from "@reduxjs/toolkit";
import { noop } from "lodash";
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
    type Store = ReturnType<typeof getStore> 
    let store: Store;
    let subscribeToChange : ReturnType<typeof createSubsriber>["subscribeToChange"];
    let unsubscribe: () => void;
    
    beforeEach(() => {
        store = getStore();
        const stuff = createSubsriber();
        subscribeToChange = stuff.subscribeToChange;
        unsubscribe = stuff.subscribe(store);
    });

    afterEach(() => {
        unsubscribe();
    });

    it("should call listener when store changes with state in path", () => {
        const cb = jest.fn();
        subscribeToChange("counter1", cb);

        store.dispatch(counterSlice1.actions.increment());

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith({value: 2}, expect.anything());
    });

    it("should not call listener of other part", () => {
        const cb = jest.fn();
        subscribeToChange("counter2", cb);

        store.dispatch(counterSlice1.actions.increment());

        expect(cb).not.toHaveBeenCalledWith();
    });

    it("should subscribe to inner slice part", () => {
        const cb = jest.fn();
        subscribeToChange("counter1.value", cb);

        store.dispatch(counterSlice1.actions.increment());

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith(2, expect.anything());
    });

    it("should call multiple listeners", () => {
        const cb1 = jest.fn();
        subscribeToChange("counter1.value", cb1);
        const cb2 = jest.fn();
        subscribeToChange("counter1.value", cb2);

        store.dispatch(counterSlice1.actions.increment());

        expect(cb1).toHaveBeenCalledTimes(1);
        expect(cb2).toHaveBeenCalledTimes(1);
    })
});