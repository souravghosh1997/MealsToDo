import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from '../../features/account/screen/account.screen';
import { LoginScreen } from '../../features/account/screen/loginscreen';
import { RegisterScreen } from '../../features/account/screen/register.screen';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
  //   <Stack.Screen
  //     name="Main"
  //     component={() => (
  //       <View>
  //         <Text>Account Screen</Text>
  //       </View>
  //     )}
  //   />
  //   <Stack.Screen
  //     name="Login"
  //     component={() => (
  //       <View>
  //         <Text>Login Screen</Text>
  //       </View>
  //     )}
  //   />
);
