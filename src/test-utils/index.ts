import { delay } from "lodash";
import { StoreType, RootState } from "redux-root";

export function waitForStateChange<T>(store: StoreType, selector: (state: RootState) => T, predicate: (state: T) => boolean){
    return  new Promise<void>((resolve, reject) => {
        const unsubscribe = store.subscribe(() => {
            const data = selector(store.getState())
            if(predicate(data)) {
                unsubscribe();
                resolve();
            }
        });
        delay(() => {
            unsubscribe(),
            reject()
        }, 100);
    });
}
import * as _auth from "features/auth/authTestUtils";
import * as ws from "features/workspace/workspaceTestUtils"
export const auth = _auth;

export function mockDefaults(){
    _auth.mockLogin({userId:"sd", token: "tt" });
    ws.mockFetchAll();
    ws.mockFetchSelected();

}
