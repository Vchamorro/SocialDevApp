import { View, Text } from 'react-native';
import React from 'react';

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'signIn':
            return {
                ...state,
                errorMessage: '',
                token: action.payload.token,
                status: 'authenticated',
                user: action.payload.user,
            }
        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                token: action.payload.token,
                status: 'authenticated',
                user: action.payload.user,
            }
        case 'notAuthenticated':
        case 'logout':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
            }
        case 'addError':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
                errorMessage: action.payload
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: []
            }
        case 'updateUser':
            return {
                ...state,
                user: action.payload
            }
    }
}
