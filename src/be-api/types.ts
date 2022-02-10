import { AxiosInstance } from "axios";
import type { AuthBE } from "features/auth"
import type { WorkspaceBE } from "features/workspace"
import type { CraftItemsBE } from "features/craft-items"

export interface AggregatedBackEndAPI {
    auth: AuthBE,
    workspace: WorkspaceBE,
    items: CraftItemsBE
}

export abstract class BaseBackEndAPI {
    protected axiosInstance: AxiosInstance;
    constructor(axios: AxiosInstance){
        this.axiosInstance = axios;
    }
}

