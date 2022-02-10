import { RootState } from "./types";
import axios from "axios";

export function getAxionDefaultConfig(state: RootState) {
    const userBase = state.auth.base
    return {
        headers: {
            "X-CSRF-TOKEN": userBase.token,
            "X-CLIENT-ID": userBase.sessionId,
            withCredentials: true
        }
    }
}

export function getAxiosInstance(userData: {token: string, sessionId: string}) {
    return axios.create({
        headers: {
            "X-CSRF-TOKEN": userData.token,
            "X-CLIENT-ID": userData.sessionId,
            withCredentials: true
        }
    })
}