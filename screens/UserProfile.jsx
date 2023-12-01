import React, { useContext, useEffect } from 'react';
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
import { Header } from '../Components/Header';
import { authReducer } from '../context/AuthReducer';
import { AuthContext } from '../context/AuthContext';

export const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    const { user } = useContext(AuthContext)



    return (
        <>
            <Header />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 24,
                        textAlign: 'center',
                        marginTop: 60,
                        fontFamily: 'LobsterTwo-Regular'
                    }}>
                    {user.name}

                </Text>
                <View>
                    {/* {userData ? (
                        <Text>Nombre de usuario: {userData.username}</Text>

                    ) : (
                        <Text>No se encontraron datos del usuario.</Text>
                    )} */}
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.container}>
                    <View style={{ marginTop: 10 }}>

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
