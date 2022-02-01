import * as authBE from "./store/authBE"

export function mockLogin(userData: {token: string, userId: string}){
    return jest.spyOn(authBE, "loginBE").mockImplementation(() => {
        return Promise.resolve({
            userInfo: {
                id: userData.userId,
                email: "email",
                firstName: "name"
            },
            token: userData.token
        })
    })
}