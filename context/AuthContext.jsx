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

    const signUp = async (
        name,
        lastName,
        date,
        user,
        username,
        password,
        //selectedLanguages,
        //softSkills,
        //areaSkills,
    ) => {
        console.log('entre');
        try {
            console.log('Enviando solicitud de registro...');
            const { data } = await userApi.post('/register', {
                name,
                lastName,
                user,
                password,
                date,
                username,
                pdf_path: '',
                role: 0,
                publications: 0,
                //selectedLanguages,
                //softSkills,
                //areaSkills,
            });
            console.log(data.user);
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user,
                },
            });

            // Almacenar el token del usuario.
            await AsyncStorage.setItem('token', response.data.token);
        } catch (error) {
            console.log(error.response.data.errors);
            dispatch({
                type: 'addError',
                payload: error.response.data.errors,
            });
        }
        console.log('registro');
        console.log(name);
    };

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