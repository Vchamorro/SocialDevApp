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
import {useState} from 'react';

export const Register = (): JSX.Element => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const adminUser = {
    user: 'admin',
    password: '1234',
  };
  const login = () => {
    console.log(user);
    console.log(password);
    if (user === adminUser.user && password === adminUser.password) {
      console.log('Ingreso con exito!');
    } else {
      console.log('Credenciales incorrectas.');
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Usuario"
            value={user}
            onChangeText={setUser}
            keyboardType="email-address"
          />
        </View>
        <View>
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress={login}>
          <Text>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
