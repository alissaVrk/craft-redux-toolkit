import { RootState } from "redux-root";
import { workspacesAdapter } from "./workSpaceSlice";

export const selectors = {
    ...workspacesAdapter.getSelectors<RootState>((state) => state.workspaces),
    selectIsFetching: (state: RootState) => state.workspaces.isFetching
}