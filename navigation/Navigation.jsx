import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Home } from '../screens/Home';
import { BottomNavigator } from './BottomNavigator';

export const Navigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
                <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
                <Stack.Screen name = 'Home' component={Home} />
                <Stack.Screen name = 'BottomNavigator' component={BottomNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
