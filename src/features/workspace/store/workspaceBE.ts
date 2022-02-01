import axios, { AxiosRequestConfig } from "axios";
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