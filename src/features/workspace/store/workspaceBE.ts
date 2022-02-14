import { BaseBackEndAPI } from "redux-root";
import { Workspace } from "./types";

type Entry = {
    id: string,
    key: string,
    person: string,
    value: string //json
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