import { workSpaceSlice } from "./workSpaceSlice"
export { initSlice, subscribeToWorkspaceChanged } from "./workSpaceSlice"
export { selectors } from "./workspaceSelectors"
export const actions = workSpaceSlice.actions;
export * from "./types";