import React, { useContext } from 'react';
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
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import {
    useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import { AuthContext } from '../context/AuthContext';
import {
    Formik,
    Form,
    Field,
    yupToFormErrors,
    useFormik,
    FormikHelpers,
} from 'formik';

import * as Yup from 'yup';

export const EditProfile = () => {
    const navigation = useNavigation()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
   

    const { editProfile } = useContext(AuthContext)

    const registerValidationSchema = Yup.object().shape({
        name: Yup.string().required('El campo nombre es requerido'),
        lastName: Yup.string().required('El campo apellido es requerido'),
        password: Yup.string().required('El campo contraseña es requerido'),
        
    });

    const volver = () => {
        navigation.navigate('BottomNavigator')
    }

    const { user } = useContext(AuthContext)

    const { updateUser } = useContext(AuthContext)

    const getData = (values, formikHelpers) => {
        Keyboard.dismiss()
        console.log(values.name, values.lastName, values.password)
        updateUser(values.name, values.lastName, values.password)
        formikHelpers.setSubmitting(false)
    }
    

    


    return (
        <>

            <Formik

                initialValues={{
                    name: user.name,
                    lastName: user.last_name,
                    password: '',
                    
                }}
                onSubmit={(values, formikHelpers) => getData(values, formikHelpers)}
                validationSchema={registerValidationSchema}>
                {({
                    values,
                    handleChange,
                    handleBlur,
                    errors,
                    setFieldTouched,
                    touched,
                    isValid,
                    handleSubmit,
                }) => (
                    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                        <KeyboardAvoidingView>
                            <ScrollView>
                                <View style={{ flex: 1 }}></View>
                                <View style={styles.container}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 24,
                                            textAlign: 'center',
                                            marginTop: 60,
                                            fontFamily: 'LobsterTwo-Regular'
                                        }}>
                                        Ingrese los datos que desea editar
                                    </Text>
                                    <View>
                                        <TextInput
                                            placeholder="Nombre"
                                            placeholderTextColor={'grey'}
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            keyboardType="default"
                                            style={styles.inputs}
                                        />
                                        <Text style={{ fontSize: 10, color: 'red' }}>
                                            {errors.name}
                                        </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="Apellido"
                                            placeholderTextColor={'grey'}
                                            value={values.lastName}
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                            keyboardType="default"
                                            style={styles.inputs}
                                        />
                                        <Text style={{ fontSize: 10, color: 'red' }}>
                                            {errors.lastName}
                                        </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="Contraseña"
                                            placeholderTextColor={'grey'}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            secureTextEntry={true}
                                            style={styles.inputs}
                                        />
                                        <Text style={{ fontSize: 10, color: 'red' }}>
                                            {errors.password}
                                        </Text>
                                    </View>
                                    
                                    {/* Botón de registro */}
                                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                        <Text>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={volver} style={styles.button}>
                                        <Text>Volver</Text>
                                    </TouchableOpacity>
                                    <View style={{ marginTop: 10 }}></View>
                                </View>
                                <View style={{ flex: 1 }}></View>
                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    mode="date"
                                    onConfirm={selectedDate => {
                                        setOpen(false);
                                        setDate(selectedDate);
                                    }}
                                    onCancel={() => {
                                        setOpen(false);
                                    }}
                                />
                            </ScrollView>
                        </KeyboardAvoidingView>
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
    dateText: {
        color: 'black'
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 5,
        backgroundColor: 'white',
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});