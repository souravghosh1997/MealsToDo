import React from "react";
import styled from "styled-components/native";

import { Platform } from "react-native";

import { Text } from "../typography/text.component";
//  import  {WebView}  from 'react-native-webview';
const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

// const CompactWebview = styled(WebView)`
//   border-radius: 10px;
//   width: 120px;
//   height: 100px;
// `;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;
const Image = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;
const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant }) => {
   const Image = isAndroid ? CompactImage : CompactImage;

  return (
    <>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text center variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </>
  );
};