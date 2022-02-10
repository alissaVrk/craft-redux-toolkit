import type { TestUtils } from "test-utils";
import { authSlice, login } from "./store/authSlice";
import { User, AuthBE } from "./store/types";

const defaultUserRes = {
    sessioId: "mySession",
    userInfo: { id: "u1", email: "userEmail" } as User,
    token: "ServerToken"
}


export function getMockedAuthBE(): Record<keyof AuthBE, jest.Mock> {
    return {
        login: jest.fn((email: string, pass: string) => {
            const data = {
                    userInfo: {
                        id: "someUser_" + pass,
                        email: email,
                        firstName: "name"
                    },
                    token: "token_" + pass
                }
            return Promise.resolve(data);
        }).mockName("LOGIN DEFAULT")
    }
}

class AuthTestUtils implements TestUtils<"auth"> {
    getInitializedState() {
        const state = authSlice.getInitialState();
        const withLogin = authSlice.reducer(state, login.fulfilled(defaultUserRes, "requestId", { email: "ee", pass: "pp" }));
        return {
            [authSlice.name]: withLogin
        };
    }
    getStateWithoutUser() {
        return {
            [authSlice.name]: authSlice.getInitialState()
        };
    }
}
export const authTestUtils = new AuthTestUtils();