import { initSockets } from "communication";
import { CraftItemDeprecated, transformToCraftItem } from "data-transform";
import { User, actions as authActions } from "features/auth";
import { beApiActions, StoreType, SubscribeToChange } from "redux-root";

declare global {
    interface Window {
      // add you custom properties and methods
      ngService: {
        getAllItems: (productId: string) => Promise<CraftItemDeprecated[]>,
        getUserInfo: () => {token: string, userInfo: User, sessionId: string},
        getSelectedProductId: () => string,
        updateFromReact: (type: string, data: any) => void
      }
    }
  }

export function initStoreAndSockets({store, subscribeToChange}: {
    store: StoreType,
    subscribeToChange: SubscribeToChange
}){
    const ngService = window.ngService;

    store.dispatch(beApiActions.overrideApis({
        auth: {
            login: () => {
                const user = ngService.getUserInfo();
                console.log("UUUUUU", user)
                return Promise.resolve({
                    token: user.token,
                    sessionId: user.sessionId,
                    userInfo: {
                        id: user.userInfo.id,
                        email: user.userInfo.email,
                        firstName: user.userInfo.firstName
                    }
                })
            }
        },
        workspace: {
            fetchSelectedWorkspace: () => Promise.resolve(ngService.getSelectedProductId())
        },
        items: {
            fetchAll: async  (workspaceId: string, _userId: string) => {
                const items = await ngService.getAllItems(workspaceId)
                return items.map((it) => transformToCraftItem(it))
            }
        }
    }));

    store.dispatch(authActions.login({email: "dont care", pass: "pass"}));
    
    initSockets(store, subscribeToChange);

    return store;
}