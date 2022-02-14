import { ItemsList, ItemPanel } from "features/craft-items";
import { react2angular } from "react2angular";
import { StoreType } from "redux-root";
import { wrapComponentWithProviders } from "./wrapWithProviders";

export function initComponents(store: StoreType, angular: ng.IAngularStatic) {
    const W_ItemsList = wrapComponentWithProviders(ItemsList, store);
    const W_ItemPanel = wrapComponentWithProviders(ItemPanel, store);

    angular
        .module('myApp.reactComps', [])
        .component('itemsList', react2angular(W_ItemsList, ['itemUrlBuilder', 'onClick']))
        .component('itemPanel', react2angular(W_ItemPanel, ['itemId']))
}