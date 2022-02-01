import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {initSlice as initAuth} from "features/auth";
import {initSlice as initWs} from "features/workspace";
import { createSubsriber } from './storeSubscribe';

export function createStore(){
  const {subscribe, subscribeToChange} = createSubsriber();

  const auth = initAuth({subscribeToStoreChange: subscribeToChange});
  const ws = initWs({subscribeToStoreChange: subscribeToChange});

  const store = configureStore({
    reducer: {
      counter: counterReducer,
      [auth.name]: auth.reducer,
      [ws.name]: ws.reducer
    },
  });

  subscribe(store);

  return store;
}