import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {initSlice as initAuth} from "features/auth";
import {initSlice as initWs} from "features/workspace/store";
import {initSlice as initItems} from "features/craft-items";
import { createSubsriber } from './storeSubscribe';

export function createStore(initialState?: any){
  const {subscribe, subscribeToChange} = createSubsriber();

  const subscribeArg = {subscribeToStoreChange: subscribeToChange} 
  const auth = initAuth(subscribeArg);
  const ws = initWs(subscribeArg);
  const items = initItems(subscribeArg);

  const store = configureStore({
    reducer: {
      // counter: counterReducer,
      [auth.name]: auth.reducer,
      [ws.name]: ws.reducer,
      [items.name]: items.reducer
    },
    preloadedState: initialState
  });

  subscribe(store);

  return store;
}