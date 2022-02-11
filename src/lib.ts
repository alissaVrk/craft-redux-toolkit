import "features/initialFeature";
import { initProviders, wrapComponentWithProviders } from "ng-connect";
import { react2angular } from 'react2angular'

console.log("LOADED REACT");
const initLib = () => {
  console.log("INIT REACT")
  initProviders(document.getElementById('root'))
}

declare global {
    interface Window {
      // add you custom properties and methods
      initReactApp:() => void
    }
  }
  
  window.initReactApp = initLib;

  //@ts-ignore
  angular
    .module('myApp.reactComps', [])