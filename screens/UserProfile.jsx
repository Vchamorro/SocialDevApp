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
    Image,
} from 'react-native';
import {
    useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../Components/Header';
import { authReducer } from '../context/AuthReducer';
import { AuthContext } from '../context/AuthContext';
import images from '../utils/images';
import { Navigation } from '../navigation/Navigation';

export const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    const { user } = useContext(AuthContext)

    const navigation = useNavigation()

    const editProfile = () => {
        navigation.navigate('EditProfile')
    }

    return (
        <>
            <Header />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 24,
                        textAlign: 'left',
                        marginTop: 13,
                        fontFamily: 'LobsterTwo-Regular'
                    }}>
                    Nombre:{user.name} {user.last_name}
                </Text>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 24,
                        textAlign: 'left',
                        marginTop: 13,
                        fontFamily: 'LobsterTwo-Regular'
                    }}>
                    Nombre de usuario: {user.user_name}
                </Text>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 24,
                        textAlign: 'left',
                        marginTop: 13,
                        fontFamily: 'LobsterTwo-Regular'
                    }}>
                    Correo:{user.email}
                </Text>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 24,
                        textAlign: 'left',
                        marginTop: 13,
                        fontFamily: 'LobsterTwo-Regular'
                    }}>
                    Publicaciones Subidas:{user.publications}
                </Text>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 24,
                        textAlign: 'left',
                        marginTop: 13,
                        fontFamily: 'LobsterTwo-Regular'
                    }}>
                    Habilidades:{user.skills}
                </Text>
                
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity onPress={editProfile} style={{alignItems:'flex-end', marginTop:400}}>
                <Image source={images.utils.editProfile} style={{ width: 60, height: 60}} />
                </TouchableOpacity>
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
