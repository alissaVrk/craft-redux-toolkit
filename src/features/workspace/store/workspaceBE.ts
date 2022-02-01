import axios, { AxiosRequestConfig } from "axios";
import { Workspace } from "./types";

export async function fetchAll(config: AxiosRequestConfig) {
    const result = await axios.get<{data: {list: Array<Workspace>}}>("api/products", config);
    return result.data.data.list;
}