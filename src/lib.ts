import "features/initialFeature";
import { initProviders, initStoreAndSockets, initComponents } from "ng-connect";
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
    initProviders(document.getElementById('root'));
  };

  initComponents(storeAndSubscribe.store, window.angular);