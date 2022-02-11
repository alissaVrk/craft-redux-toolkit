import { Action, EnhancedStore, ThunkAction } from "@reduxjs/toolkit";
import type { AuthState } from "features/auth";
import type { CraftItemsState } from "features/craft-items";
import type { WorkspacesState } from "features/workspace";
import type { BeOverridesState } from "./be-api";
import type { createStore } from "./store";

export type RootState = Readonly<{
  auth: AuthState,
  workspaces: WorkspacesState,
  items: CraftItemsState,
  beOverrides: BeOverridesState
}>

export type StoreType = ReturnType<typeof createStore> 

export type AppDispatch = StoreType["dispatch"];
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