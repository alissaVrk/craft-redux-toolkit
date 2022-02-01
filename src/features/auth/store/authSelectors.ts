import { RootState } from "redux-root";

export const selectors = {
    selectUserInfo: (state: RootState) => state.auth.user 
}