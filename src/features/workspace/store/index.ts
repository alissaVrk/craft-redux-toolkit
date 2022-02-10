import { registerBackendAPI } from "be-api";
import { WorkspaceBE } from "./workspaceBE";

export { initSlice, subscribeToWorkspaceChanged } from "./workspaceSlice"
export { selectors } from "./workspaceSelectors"
export * as actions from "./workspaceActions";
export * from "./types";
export * from "./workspaceFetchers"

registerBackendAPI("workspace", WorkspaceBE)