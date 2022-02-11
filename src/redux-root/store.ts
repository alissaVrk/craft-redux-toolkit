import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import { beApiOverridesSlice } from "./be-api/overridesSlice"
import { createSubsriber } from './storeSubscribe';
import { RootState, SubscribeToChange } from './types';
import { mapValues } from 'lodash';

const registry: Partial<{[key in keyof RootState]: 
  ({subscribeToStoreChange}: {subscribeToStoreChange: SubscribeToChange}) => 
  Reducer<RootState[key], AnyAction>}> = {
    "beOverrides": () => beApiOverridesSlice.reducer
  };

export function registerSlice(sliceInitiation: typeof registry){
  Object.assign(registry, sliceInitiation);
}

export function createStoreAndSubscription(initialState?: any) {
  const {subscribe, subscribeToStoreChange} = createSubsriber();

  const reducers = mapValues(
    registry as Required<typeof registry>, 
    initFn => initFn({subscribeToStoreChange})
  ) as {[key in keyof RootState]: Reducer<RootState[key], AnyAction>};

  const store = configureStore({
    reducer: reducers ,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ["beOverrides"]
        }
      })
  })
  
  subscribe(store);

  return {
    store,
    subscribeToChange: subscribeToStoreChange
  }
}

export function createStore(initialState?: any) {
  const {store} = createStoreAndSubscription(initialState);
  return store;
}