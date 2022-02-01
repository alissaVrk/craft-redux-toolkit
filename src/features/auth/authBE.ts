import axios from "axios";
import { User } from "./types";

export async function loginBE(){
    const res = await axios.post<{data: {token: string, userInfo: User}}>("api/auth/login", {
        username: "alissa@craft.io",
        password: "tg7Panvt&"
    }, {
        withCredentials: true
    })
    
    return res.data.data;
}