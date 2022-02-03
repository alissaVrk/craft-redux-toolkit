import * as authBE from "./store/authBE"
import { authSlice, login } from "./store/authSlice";
import { User } from "./store/types";

const defaultUserRes = {
    sessioId: "mySession",
    userInfo: { id: "u1", email: "userEmail" } as User,
    token: "ServerToken"
}

export function mockLogin(userData?: { token: string, userId: string }) {
    const data = userData
        ? {
            userInfo: {
                id: userData.userId,
                email: "email",
                firstName: "name"
            },
            token: userData.token
        }
        : defaultUserRes

    return jest.spyOn(authBE, "loginBE").mockImplementation(() => {
        return Promise.resolve(data)
    })
}

export function getInitializedState() {
    const state = authSlice.getInitialState();
    const withLogin = authSlice.reducer(state, login.fulfilled(defaultUserRes, "requestId", {email: "ee", pass: "pp"}));
    return {
        [authSlice.name]: withLogin
    };
}