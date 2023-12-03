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
} from 'react-native';
import {useContext, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {userApi} from '../api/userApi';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../Components/Header';

export const AddPost = () => {
  const {user, token} = useContext(AuthContext);

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

  return (
    <>
      <Header />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
            //value={values.user}
            //onChangeText={handleChange('user')}
            //onBlur={handleBlur('user')}
            keyboardType="email-address"
            style={styles.inputs}
          />
        </View>
        <View>
          <TextInput
            placeholder="Descripción"
            placeholderTextColor={'grey'}
            //value={values.user}
            //onChangeText={handleChange('user')}
            //onBlur={handleBlur('user')}
            keyboardType="email-address"
            style={styles.description}
          />
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
            source={{uri: image}}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleChoosePhoto()}>
          <Text
            style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
            Agregar Imagen
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
        <View style={styles.container}>
          <View style={{marginTop: 10}}></View>
        </View>
        <View style={{flex: 1}}></View>
      </SafeAreaView>
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
