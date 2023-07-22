import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { FavouritesContext } from '../../../services/favourites/favourites.context';

import { SafeArea } from '../../../components/utiliy/safeAreaComponents';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.components';

import { RestaurantList } from '../../restaurant/components/restaurant-list.styles';
import { RestaturentInfoCard } from '../../restaurant/components/restaurent-info-card.components';

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);
  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  NewRestaurant: item,
                })
              }>
              <Spacer position="bottom" size="large">
                <RestaturentInfoCard restaurents={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>No favourites yet</Text>
    </NoFavouritesArea>
  );
};
