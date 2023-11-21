import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Home} from '../screens/Home';
import {AddPost} from '../screens/AddPost';
import {UserProfile} from '../screens/UserProfile';
import {useEffect} from 'react';
import images from '../utils/images';
import {Image, Touchable, TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  useEffect(() => {});
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 70},
        headerShown: false,
        tabBarInactiveBackgroundColor: 'black',
        tabBarActiveBackgroundColor: 'black',
        tabBarActiveTintColor: 'white',
        tabBarLabel: () => null,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={images.footer.homeImage}
              style={{width: 40, height: 40}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={images.footer.addImage}
              style={{width: 40, height: 40}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserProfile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={images.footer.userImage}
              style={{width: 40, height: 40}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
