import { AuthBE } from "./authBE";

import { registerBackendAPI } from "be-api";

import { login } from "./authSlice";
export { subscribeToUserChanged, initSlice } from "./authSlice";
export const actions = {
    login
}
export * from "./authSelectors"
export * from "./types"

registerBackendAPI("auth", AuthBE);