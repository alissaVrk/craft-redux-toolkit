import { RootState } from "redux-root";

export interface TestUtils<K extends keyof RootState> {
    getInitializedState: () => {[key in K]: RootState[key]}
}

export type TestUtilsT<K extends keyof RootState> = {
    getInitializedState: () => {[key in K]: RootState[key]}
}