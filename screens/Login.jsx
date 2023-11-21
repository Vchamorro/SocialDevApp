import React, {useContext, useEffect} from 'react';
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
  Keyboard,
} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Formik,
  Form,
  Field,
  yupToFormErrors,
  useFormik,
  FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import {userApi} from '../api/userApi';
import {AuthContext} from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const adminUser = {
    email: 'Admin@gmail.com',
    password: '12345678',
  };

  const {signIn} = useContext(AuthContext);
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Ingrese un correo valido')
      .required('El campo correo es requerido'),
    password: Yup.string().required('El campo contraseña es requerido'),
  });

  const consultarApi = async () => {
    const response = await userApi.get('http://192.168.0.16:8000/api/users');
    console.log(response.data);
  };
  const login = (values, formikHelpers) => {
    Keyboard.dismiss();
    signIn(values.email, values.password);
    formikHelpers.setSubmitting(false);
  };

  const register = () => {
    navigation.navigate('Register');
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, formikHelpers) => login(values, formikHelpers)}
        validationSchema={loginValidationSchema}>
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
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}></View>
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 50,
                  color: 'black',
                  fontFamily: 'LobsterTwo-Regular',
                }}>
                SocialDev
              </Text>
              <View>
                <TextInput
                  placeholder="Correo"
                  placeholderTextColor={'grey'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  style={styles.inputs}
                />

                <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
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

                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.password}
                </Text>
              </View>
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text>Iniciar Sesion</Text>
              </TouchableOpacity>
              <View style={{marginTop: 10}}>
                <Text style={{color: 'black'}}>¿No tienes cuenta?</Text>
                <TouchableOpacity
                  onPress={register}
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: 'blue',
                      fontSize: 18,
                    }}>
                    Registrate
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1}}></View>
          </SafeAreaView>
        )}
      </Formik>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 250,
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
    alignItems: 'center',
  },
});
