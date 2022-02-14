import { initSockets } from "communication";
import { User, actions as authActions } from "features/auth";
import { CraftItem } from "features/craft-items";
import { beApiActions, createStoreAndSubscription, StoreType, SubscribeToChange } from "redux-root";

declare global {
    interface Window {
      // add you custom properties and methods
      ngService: {
        getAllItems: (productId: string) => Promise<CraftItem[]>,
        getUserInfo: () => {token: string, userInfo: User},
        getSelectedProductId: () => string
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
                return items.map((it) => ({
                    id: it.id,
                    title: it.title,
                    type: it.type,
                    shortId: it.shortId,
                    productId: it.productId
                }))
            }
        }
    }));

    store.dispatch(authActions.login({email: "dont care", pass: "pass"}));
    
    initSockets(store, subscribeToChange);

    return store;
}