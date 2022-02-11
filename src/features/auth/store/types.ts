export type { AuthBE } from "./authBE";

export type User = {
    email: string
    id: string
    firstName: string
}

export type AuthState = {
    base: {
        userId: string,
        token: string,
        sessionId: string
    },
    user: User
}