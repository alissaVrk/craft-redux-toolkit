import axios from "axios";
import { BaseBackEndAPI } from "redux-root";
import { User } from "./types";

export async function loginBE(email: string, pass: string){
    const res = await axios.post<{data: {token: string, userInfo: User}}>("api/auth/login", {
        username: email,
        password: pass
    }, {
        withCredentials: true
    })
    
    return res.data.data;
}

export class AuthBE extends BaseBackEndAPI {
    public async login(email: string, pass: string) {
        const res = await this.axiosInstance.post<{data: {token: string, userInfo: User}}>("api/auth/login", {
            username: email,
            password: pass
        })
        
        return res.data.data;
    }
}