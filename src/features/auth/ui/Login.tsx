import { useAppDispatch } from "redux-root";
import { actions } from "../store";

export function Login(){
    const dispatch = useAppDispatch();
    return(
        <button onClick={() => dispatch(actions.login())}>login</button>
    )
}