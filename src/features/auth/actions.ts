import { AppDispatch } from "redux-root";
import { login } from "./authSlice";

export async function loginAnInit(dispatch: AppDispatch){
    const userData = await dispatch(login()).unwrap();
    dispatch({type: "userLoggenIn", payload: userData});
}