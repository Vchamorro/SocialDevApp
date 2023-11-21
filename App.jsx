/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Header} from './Components/Header';
import {AuthProvider} from './context/AuthContext';
import {Navigation} from './navigation/Navigation';
import {SafeAreaView} from 'react-native';
import React from 'react';

const AppState = ({children}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppState>
        <Navigation />
      </AppState>
    </SafeAreaView>
  );
}

export default App;
