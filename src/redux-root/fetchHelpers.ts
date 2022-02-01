import { RootState } from "./types";

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