import * as authBE from "./authBE"

export function mockLogin(userData: {token: string, userId: string}){
    return jest.spyOn(authBE, "loginBE").mockImplementation(() => {
        return Promise.resolve({
            userInfo: {
                id: userData.userId
            },
            token: userData.token
        })
    })
}