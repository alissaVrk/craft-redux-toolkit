import axios, { AxiosRequestConfig } from "axios";
import { BaseBackEndAPI } from "be-api";
import { Workspace } from "./types";

export async function fetchAll(config: AxiosRequestConfig) {
    const result = await axios.get<{data: {list: Array<Workspace>}}>("api/products", config);
    return result.data.data.list;
}

type Entry = {
    id: string,
    key: string,
    person: string,
    value: string //json
}

export async function fetchSelectedWorkspace(config: AxiosRequestConfig) {
    const result = await axios.get<{data:Array<Entry>}>("api/uservalue", config);
    const list = result.data.data;
    const entry = list.find(it => it.key === "last:active:product");
    return entry && JSON.parse(entry.value);   
}

export class WorkspaceBE extends BaseBackEndAPI {
    async fetchAll() {
        const result = await this.axiosInstance.get<{data: {list: Array<Workspace>}}>("api/products");
        return result.data.data.list;
    }

    async fetchSelectedWorkspace() {
        const result = await this.axiosInstance.get<{data:Array<Entry>}>("api/uservalue");
        const list = result.data.data;
        const entry = list.find(it => it.key === "last:active:product");
        return entry && JSON.parse(entry.value);   
    }
}