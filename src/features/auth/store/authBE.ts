import axios from "axios";
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