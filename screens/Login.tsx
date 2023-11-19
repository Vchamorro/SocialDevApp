import React, { useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik, Form, Field, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { userApi } from '../api/userApi';

export const Login = (): JSX.Element => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigation = useNavigation()
    const adminUser = {
        email: 'Admin@gmail.com',
        password: '1234'
    }
    const loginValidationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email('Ingrese un correo valido')
            .required('El campo correo es requerido'),
        password: Yup
            .string()
            .min(8, ({ min }) => `La contraseña debe tener minimo ${min} caracteres`)
            .max(15)
            .required('El campo contraseña es requerido'),
    })

    const consultarApio = async () => {
        await userApi.get('')
    }
    const login = () => {
        console.log(email)
        console.log(password)
        // if (!email || !password) {
        //     console.log('Ingrese datos porfavor.')
        //     return
        // }
        // if (!validateEmail(email)) {
        //     console.log('Formato de correo invalido.')
        //     return
        // }
        // if (email === adminUser.email && password === adminUser.password) {
        //     navigation.navigate('BottomNavigator')
        // } else {
        //     console.log('Credenciales incorrectas.')
        // }
    }
    const register = () => {
        navigation.navigate('Register')
    }
    const validateEmail = (email: string) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            return false;
        }
        else {
            return true
        }
    }
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={values => Alert.alert(JSON.stringify(values))}
                validationSchema={loginValidationSchema}>
                {({ values, handleChange, handleBlur, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={styles.container}>
                            <Text style={{ fontSize: 50, color: 'black', fontFamily: 'LobsterTwo-Regular' }}>
                                SocialDev
                            </Text>
                            <View>
                                <TextInput placeholder='Correo'
                                    placeholderTextColor={'grey'}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    keyboardType='email-address'
                                    style={styles.inputs} />

                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>

                            </View>
                            <View>
                                <TextInput
                                    placeholder='Contraseña'
                                    placeholderTextColor={'grey'}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry={true}
                                    style={styles.inputs} />

                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                )}
                            </View>
                            <TouchableOpacity onPress={login} style={styles.button}>
                                <Text>
                                    Iniciar Sesion
                                </Text>

                            </TouchableOpacity>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: 'black' }}>
                                    ¿No tienes cuenta?
                                </Text>
                                <TouchableOpacity onPress={register} style={{ alignItems: 'center' }}>
                                    <Text style={{ textDecorationLine: 'underline', color: 'blue', fontSize: 18 }}>
                                        Registrate
                                    </Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}></View>
                    </SafeAreaView>
                )}
            </Formik>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        backgroundColor: 'lightgrey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: 'black',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        marginTop: 15,
        width: 250
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        marginTop: 15,
        width: 200,
        alignItems: 'center'
    },
});
