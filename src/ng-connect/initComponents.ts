import { ItemsPage, CraftItemCard } from "features/craft-items";
import { react2angular } from "react2angular";
import { StoreType } from "redux-root";
import { wrapComponentWithProviders } from "./wrapWithProviders";

export function initComponents(store: StoreType, angular: ng.IAngularStatic) {
    const W_ItemsList = wrapComponentWithProviders(ItemsPage, store);
    const W_CraftItemCard = wrapComponentWithProviders(CraftItemCard, store);

    angular
        .module('myApp.reactComps', [])
        .component('itemsList', react2angular(W_ItemsList, ['itemUrlBuilder', 'onClick']))
        .component('itemCardReact', react2angular(W_CraftItemCard, ['itemId', 'groupId']))
}