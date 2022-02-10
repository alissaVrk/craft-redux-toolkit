import { authTestUtils, getMockedAuthBE } from "features/auth/authTestUtils";
import { workspaceTestUtils, getMockedWorskapceBE} from "features/workspace/workspaceTestUtils";
import { getMockedItemsBE, craftItemTestUtils } from "features/craft-items/craftItemsTestUtils";
import { assign } from "lodash";
import { RootState } from "redux-root";

export const features = {
    auth: authTestUtils,
    ws: workspaceTestUtils,
    items: craftItemTestUtils
}

export function getMockedBeApi(){
    return {
        auth: getMockedAuthBE(),
        workspace: getMockedWorskapceBE(),
        items: getMockedItemsBE()
    }
}

export function getInitializedState() {
   const states: Array<Object> = Object.values(features).map(testUtils => testUtils.getInitializedState());
   const state = assign({}, ...states);
   return state as RootState;
}