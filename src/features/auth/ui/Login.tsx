import { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux-root";
import { actions, selectors } from "../store";

export function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectors.selectUserInfo);

    async function login() {
        setIsLoading(true);
        await dispatch(actions.login()).unwrap();
        setIsLoading(false);
    }

    if (isLoading) {
        return (<h6>Loading....</h6>)
    }
    if (!user.id) {
        return (
            <button onClick={login}>login</button>
        )
    }


    return (<h6>Hello {user.email}</h6>)
    
}