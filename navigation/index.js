import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Explore from '../screens/Explore';
import Browse from '../screens/Browse';
import Product from '../screens/Product';
import Settings from '../screens/Settings';
import Forgot from '../screens/Forget';

import { theme } from '../constants';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTitle: '',
          cardShadowEnabled: false,
          cardOverlayEnabled: false,
          cardStyle: {
            backgroundColor: 'white'
          },
          headerBackImage: () => (
            <Image source={require('../assets/icons/back.png')} />
          ),
          headerBackTitle: null,
          headerLeftContainerStyle: {
            alignItems: 'center',
            marginLeft: theme.sizes.base * 2,
            paddingRight: theme.sizes.base
          },
          headerRightContainerStyle: {
            alignItems: 'center',
            paddingRight: theme.sizes.base
          },
          headerStyle: {
            height: theme.sizes.base * 4,
            backgroundColor: theme.colors.white,
            borderBottomColor: 'transparent',
            elevation: 0
          }
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Forgot" component={Forgot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
