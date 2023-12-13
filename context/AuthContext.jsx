import React, {createContext, useReducer, useEffect, useState} from 'react';
import {authReducer} from './AuthReducer';
import {userApi} from '../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authInitialState = {
  status: 'checking',
  token: null,
  user: null,
  errorMsg: null,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    checkToken();
  }, [])

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (!token) return dispatch({ type: 'notAuthenticated' });
    try {
      const { data } = await userApi.get('/token/validate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: 'signIn',
        payload: {
          token: data.token,
          user: data.user,
        }
      })
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({ type: 'notAuthenticated' });
      }
    }
  }

  const signIn = async (email, password) => {
    try {
      const { data } = await userApi.post('/login', { email, password });
      dispatch({
        type: 'signIn',
        payload: {
          token: data.token,
          user: data.user,
        }

      })
      console.log(data);
      // Almacenar el token del usuario.
      await AsyncStorage.setItem('token', data.token);
      getPosts();
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
    selectedLanguages,
    softSkills,
    areaSkills,
  ) => {
    try {
      const formatteDate = date.toISOString().slice(0, 10).replace('T', ' ');
      console.log('Enviando solicitud de registro...');
      const userdates = {
        name: name,
        last_name: lastName,
        email: user,
        password: password,
        birth_date: formatteDate,
        user_name: username,
        pdf_path: 'dot',
        role: 0,
        publications: 0,
        area_skills_id: areaSkills,
        soft_skills_id: softSkills,
        programming_languages_id: selectedLanguages,
      };
      console.log(userdates);
      const { data } = await userApi.post('/register', userdates);

      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
        },
      });

      // Almacenar el token del usuario.
      await AsyncStorage.setItem('token', data.token);
      getPosts();
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
    });
  };
  const removeError = () => {
    dispatch({ type: 'removeError' });
  };

  const updateUser = async (
    name,
    lastName,
    password
  ) => {
    try {
      const userdates = {
        name: name,
        last_name: lastName,
        password: password,
      };
      
      const { data } = await userApi.post(`/updateUser/${user.id}`, userdates);

      dispatch({
        type: 'updateUser',
        payload: data.user,
      });

      // Almacenar el token del usuario.
      await AsyncStorage.setItem('token', data.token);
    }
    catch (error) {
      console.log(error.response.data.errors);
      dispatch({
        type: 'addError',
        payload: error.response.data.errors,
      });
    }
  }
      
      

  const getPosts = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    try {
        const { data } = await userApi.get('posts',{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(data);
        setPosts(data);

    } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
    }
}

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        logOut,
        removeError,
        getPosts,
        posts,
        updateUser
      }}>
      {children}
    </AuthContext.Provider>
  );
};
