import { AuthBE } from "./authBE";

import { registerBackendAPI, registerSlice } from "redux-root";
import { login } from "./authSlice";
import { initSlice } from "./authSlice";

export { subscribeToUserChanged } from "./authSlice";
export const actions = {
    login
}
export * from "./authSelectors"
export * from "./types"

registerBackendAPI("auth", AuthBE);
registerSlice({"auth": initSlice})