import { AxiosInstance } from "axios";
import { mapValues } from "lodash";
import { AggregatedBackEndAPI, BaseBackEndAPI } from "./types";

type APIsKeys = keyof AggregatedBackEndAPI
type BackEndAPIClass = new (axios: AxiosInstance) => BaseBackEndAPI
export const registry: Partial<Record<APIsKeys, BackEndAPIClass>> = {};

export function registerBackendAPI<K extends APIsKeys>(name: K, apiClass: BackEndAPIClass){
    registry[name] = apiClass
}

export const BE_API = {
    createInstance: (axios: AxiosInstance) => {
        return mapValues(registry, Cl => new Cl!(axios)) as AggregatedBackEndAPI;
    }
}