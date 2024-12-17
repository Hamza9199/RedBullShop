import axios, { AxiosError } from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction"; 
import { Dispatch } from "react";
import { AuthAction } from "./AuthReducer";

interface UserCredentials {
    email: string;
    password: string;
}

export const loginCall = async (userCredentials: UserCredentials, dispatch: Dispatch<AuthAction>) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:3000/server/autentifikacija/login", userCredentials);
        console.log("Login response:", res.data);

        if (res.data.isAdmin) {
            dispatch(loginSuccess(res.data)); 
            return true;
        }
    } catch (err) {
        const error = err as AxiosError;
        console.error("Login error:", error.response ? error.response.data : error.message);
        dispatch(loginFailure());
        return false;
    }
};
