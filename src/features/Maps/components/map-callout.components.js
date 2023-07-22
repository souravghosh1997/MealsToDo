import React from 'react';
import styled from 'styled-components/native';
import { CompactRestaurantInfo } from '../../../components/restaurant/compact-restaurant-info.component'

const MyText = styled.Text``;

export const MapCallout = ({restCallOut}) =>(
   <CompactRestaurantInfo restaurant = {restCallOut}/>
  // <MyText> {restCallOut.name}</MyText>
);