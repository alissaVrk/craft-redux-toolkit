import React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux-root";
import { actions, selectors } from "../store";

export function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectors.selectUserInfo);

    async function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //@ts-ignore
        const email = event.target[0].value;
        //@ts-ignore
        const pass = event.target[1].value;
        console.log(email, pass);
        setIsLoading(true);
        await dispatch(actions.login({email, pass})).unwrap();
        setIsLoading(false);
    }

    if (isLoading) {
        return (<h6>Loading....</h6>)
    }
    if (!user.id) {
        return (
            <form onSubmit={login}>
                <label>
                    email: <input type="text" name="email"/>
                </label>
                <label>
                    password: <input type="text" name="pass"/>
                </label>
                <input type="submit" value="login"/>
            </form>
        )
    }


    return (<h6>Hello {user.email}</h6>)
    
}