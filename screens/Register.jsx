import React from 'react';
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
import DatePicker from 'react-native-date-picker'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Register = () => {
    const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.container}>
                <Text style={{ color: "black" }}>
                    SocialDev
                </Text>
                <View>

                    <TextInput placeholder='Nombre' placeholderTextColor={'grey'} value={name} onChangeText={setName}
                        keyboardType='default' style={styles.inputs} />
                </View>
                <View>
                    <TextInput placeholder='Apellido' placeholderTextColor={'grey'} value={lastName} onChangeText={setLastName}
                        keyboardType='default' style={styles.inputs} />
                </View>
                <View>
                    <TouchableOpacity style={styles.inputs} onPress={() => setOpen(true)}>
                        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput placeholder='Correo' placeholderTextColor={'grey'} value={user} onChangeText={setUser}
                        keyboardType='email-address' style={styles.inputs} />
                </View>
                <View>
                    <TextInput placeholder='Contraseña' placeholderTextColor={'grey'} value={password} onChangeText={setPassword}
                        secureTextEntry={true} style={styles.inputs} />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text>
                        Registrarte
                    </Text>

                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </SafeAreaView>
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
    dateText: {
        color: 'black'
    }
});