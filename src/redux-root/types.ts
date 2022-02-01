import { Action, ThunkAction } from "@reduxjs/toolkit";
import { createStore} from "./store";

export type StoreType = ReturnType<typeof createStore> 

export type AppDispatch = StoreType["dispatch"];
export type RootState = Readonly<ReturnType<StoreType["getState"]>>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type ThunkConfig = {
  state: RootState,
  dispatch: AppDispatch
}

export type StoreChangeListener<T> = (state: T, dispatch: AppDispatch) => void;
export type SubscribeToChange = <T>(path: string, listener: StoreChangeListener<T>) => void