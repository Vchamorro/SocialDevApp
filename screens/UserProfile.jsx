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
} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../Components/Header';

export const UserProfile = () => {
  return (
    <>
      <Header />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
