import "features/initialFeature";
import { initProviders, initStoreAndSockets, initComponents, initCommunication } from "ng-connect";
import { createStoreAndSubscription } from "redux-root";

console.log("LOADED REACT");

declare global {
    interface Window {
      initReactApp:() => void
    }
  }
  
  const storeAndSubscribe = createStoreAndSubscription();

  window.initReactApp = () => {
    initStoreAndSockets(storeAndSubscribe);
    initCommunication(storeAndSubscribe.store.dispatch);
  };

  initComponents(storeAndSubscribe.store, window.angular);
  initProviders(document.getElementById('root'));