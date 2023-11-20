import React, { createContext, useReducer } from "react";
import { authReducer } from "./AuthReducer";
import { userApi } from "../api/userApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

const authInitialState = {
    status: 'checking',
    token: null,
    user: null,
    errorMsg: null,
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const signIn = async (email, password) => {
        try {
            const { data } = await userApi.post('/login', { email, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user,
                }

            })
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const signUp = () => {
        console.log('registro')
    }

    const logOut = async () => {
        dispatch({
            type: 'logout',
        })
    }
    const removeError = () => {
        dispatch({ type: 'removeError' })
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                signUp,
                logOut,
                removeError
            }}>
            {children}
        </AuthContext.Provider>
    )
}