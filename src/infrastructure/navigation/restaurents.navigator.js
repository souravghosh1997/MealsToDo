import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { RestaturentsScreen } from '../../features/restaurant/screens/restaurent.screen';
import { RestaurantDetailScreen } from '../../features/restaurant/screens/restaurent-detail.screen';
const RestaurantStack = createStackNavigator();

export const RestaturantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      ScreenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}>
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaturentsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
