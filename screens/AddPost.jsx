import React, {useEffect} from 'react';
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
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import { useContext, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { userApi } from '../api/userApi';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../Components/Header';
import {
  Formik,
  Form,
  Field,
  yupToFormErrors,
  useFormik,
  FormikHelpers,
} from 'formik';
import * as Yup from 'yup';

export const AddPost = () => {
  const { user, token } = useContext(AuthContext);

  const [image, setImage] = useState('https://via.placeholder.com/200');
  const [response, setResponse] = useState('');

  const handleChoosePhoto = () => {
    const options = {
      title: 'Seleccionar Imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.log(response.errorMessage);
      } else if (response.didCancel) {
        console.log('El usuario cancelo la acción');
      } else {
        const path = response.assets[0].uri;
        setImage(path);
        console.log(path);
        setResponse(response);
      }
    });
  };

  const uploadImage = async () => {
    const uri =
      Platform.OS === 'android'
        ? response.assets[0].uri
        : image.replace('file://', '');
    const formData = new FormData();

    // Agregamos la imagen a un formulario con el metodo append.
    formData.append('image', {
      uri,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
    });

    try {
      const response = await userApi.post('/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data.isSuccess) {
        Alert.alert('Image upload failed...');
        return;
      }

      return response.data;
    } catch (error) {
      console.log('El error es:', error);
    }
  };

  const regitrationValidationSchema = Yup.object().shape({
    title: Yup.string().required('El campo título es requerido'),
    description: Yup.string().required('El campo descripción es requerido'),
  });

  const addPost = async (values, formikHelpers) => {
    Keyboard.dismiss();
    const { url } = await uploadImage();
    const post = {
      title: values.title,
      description: values.description,
      image_path: url,
      user_id: user.id,
      likes: 0,
      comments: 0,
    };
    try {
      const { data } = await userApi.post('/post', post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      Alert.alert('El post fue creado correctamente.');
      values.title = '';
      values.description = '';
      image = setImage('https://via.placeholder.com/200');
    } catch (error) {
      console.log('Error en la solicitud:', error);
      console.log(error.response.data.errors);
    }
    console.log(post);
    formikHelpers.setSubmitting(false);
  };

  return (
    <>
      <Header />
      <Formik
        initialValues={{
          title: '',
          description: '',
        }}
        onSubmit={(values, formikHelpers) => addPost(values, formikHelpers)}
        validationSchema={regitrationValidationSchema}>
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          setFieldTouched,
          handleSubmit,
        }) => (
          <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Text
              style={{
                color: 'black',
                fontSize: 24,
                textAlign: 'center',
                marginTop: 30,
                fontFamily: 'LobsterTwo-Regular',
              }}>
              Agregar Post
            </Text>
            <View>
              <TextInput
                placeholder="Título"
                placeholderTextColor={'grey'}
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                keyboardType="email-address"
                style={styles.inputs}
              />
              <Text style={{ fontSize: 10, color: 'red', alignSelf: 'center' }}>
                {errors.title}
              </Text>
            </View>
            <View>
              <TextInput
                placeholder="Descripción"
                placeholderTextColor={'grey'}
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                keyboardType="email-address"
                style={styles.description}
              />
              <Text style={{ fontSize: 10, color: 'red', alignSelf: 'center' }}>
                {errors.description}
              </Text>
            </View>
            <View>
              <Image
                style={{
                  alignSelf: 'center',
                  height: 200,
                  width: 200,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'black',
                  marginLeft: 20,
                  marginTop: 15,
                }}
                source={{ uri: image }}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleChoosePhoto()}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Agregar Imagen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Agregar Post
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <View style={styles.container}>
              <View style={{ marginTop: 10 }}></View>
            </View>
            <View style={{ flex: 1 }}></View>
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
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    marginTop: 15,
    width: 250,
  },
  description: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 50,
    paddingHorizontal: 20,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    marginTop: 15,
    width: 250,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'blue',
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
