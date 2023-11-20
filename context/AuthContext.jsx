import React, { createContext, useReducer } from "react";
import { authReducer } from "./AuthReducer";
import { userApi } from "../api/userApi";

const authInitialState = {
    status: 'checking',
    token: null,
    user: null,
    errorMsg: null,
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const signIn = async(email = "Admin@gmail.com",password = "12345678") => {

        try{
            console.log('entre')
            const response = await userApi.post('/login', {email, password});
            console.log('entre2')
        console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const signUp = ()=>{
        console.log('registro')
    }

    return (
        <AuthContext.Provider
            value={{
                authEmail: 'arroba@arroba.arroba',
                signIn,
                signUp
            }}>
            {children}
        </AuthContext.Provider>
    )
}