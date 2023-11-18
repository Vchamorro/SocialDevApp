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
} from 'react-native';
import {
    useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';

export const Login = (): JSX.Element => {
    const [user, setUser] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigation = useNavigation()
    const adminUser = {
        user: 'admin@gmail.com',
        password: '1234'
    }
    const login = () => {
        console.log(user)
        console.log(password)
        if (!user || !password) {
            navigation.navigate('BottomNavigator')
        }
        if (!validateEmail(user)) {
            console.log('Formato de correo invalido.')
            return
        }
        if (user === adminUser.user && password === adminUser.password) {
            console.log('Ingreso con exito!')
        } else {
            console.log('Credenciales incorrectas.')
        }
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

            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}></View>
                <View style={styles.container}>
                    <Text style={{ fontSize: 50, color: 'black', fontFamily: 'LobsterTwo-Regular' }}>
                        SocialDev
                    </Text>
                    <View>
                        <TextInput placeholder='Correo' placeholderTextColor={'grey'} value={user} onChangeText={setUser}
                            keyboardType='email-address' style={styles.inputs} />
                    </View>
                    <View>
                        <TextInput placeholder='Contraseña' placeholderTextColor={'grey'} value={password} onChangeText={setPassword}
                            secureTextEntry={true} style={styles.inputs} />
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
