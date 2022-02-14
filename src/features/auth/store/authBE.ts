import { BaseBackEndAPI } from "redux-root";
import { User } from "./types";
export class AuthBE extends BaseBackEndAPI {
    public async login(email: string, pass: string) {
        const res = await this.axiosInstance.post<{data: {token: string, userInfo: User}}>("api/auth/login", {
            username: email,
            password: pass
        })
        
        return res.data.data;
    }
}