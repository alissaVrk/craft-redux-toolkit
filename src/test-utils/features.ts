import authTestUtils from "features/auth/authTestUtils";
import wsTestUtils from "features/workspace/workspaceTestUtils";
import itemsTestUtils from "features/craft-items/craftItemsTestUtils";
import { assign } from "lodash";
import { RootState } from "redux-root";

export const features = {
    auth: authTestUtils,
    ws: wsTestUtils,
    items: itemsTestUtils
}

export function getInitializedState() {
   const states: Array<Object> = Object.values(features).map(testUtils => testUtils.getInitializedState());
   const state = assign({}, ...states);
   return state as RootState;
}