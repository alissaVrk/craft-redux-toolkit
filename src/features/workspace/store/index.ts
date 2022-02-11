import { registerBackendAPI, registerSlice } from "redux-root";
import { WorkspaceBE } from "./workspaceBE";
import { initSlice } from "./workspaceSlice";

export { subscribeToWorkspaceChanged } from "./workspaceSlice"
export { selectors } from "./workspaceSelectors"
export * as actions from "./workspaceActions";
export * from "./types";
export * from "./workspaceFetchers"

registerBackendAPI("workspace", WorkspaceBE)
registerSlice({"workspaces": initSlice});