import {  createSlice } from "@reduxjs/toolkit";
import { StoreChangeListener, SubscribeToChange, createThunkWithBE_API } from "redux-root";
import { v4 as uuidv4 } from 'uuid';
import { AuthState } from "./types";

export const login = createThunkWithBE_API("auth/login", async ({email, pass}: {email: string, pass: string}, api, beAPI) => {
    const userInfo = await beAPI.auth.login(email, pass); 
    return {
        ...userInfo,
        sessioId: uuidv4()
    };
});

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        base: {},
        user: {}
    } as AuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            return {
                base: {
                    userId: action.payload.userInfo.id,
                    token: action.payload.token,
                    sessionId: action.payload.sessioId
                },
                user: action.payload.userInfo
            };
        });
    }
});

export function initSlice(){
    return authSlice.reducer
}

export function subscribeToUserChanged(subscribeToStoreChange: SubscribeToChange, listener: StoreChangeListener<AuthState["base"]>) {
    subscribeToStoreChange("auth.base", listener);
}