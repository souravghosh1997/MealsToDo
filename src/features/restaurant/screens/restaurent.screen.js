import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { RestaturentInfoCard } from '../components/restaurent-info-card.components';
import styled from 'styled-components/native';
import { Spacer } from '../../../components/spacer/spacer.components';
import { RestaurantsContext } from '../../../services/restaurant/restaurants.context';
import { Search } from '../components/search.components';
import { FavouritesBar } from '../../../components/favourites/favourites-bar.component';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { RestaurantList } from '../components/restaurant-list.styles';
import { FadeInView } from '../../../components/animations/fade.animation';
//const isAndroid = Platform.OS === 'android';
//console.log (StatusBar.currentHeight)

const SafeArea = styled.SafeAreaView`
flex: 1;
 ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`} ;
`;

// const RestaturentList = styled(FlatList).attrs({
//   contentContainerStyle: {
//     padding: 16,
//   },
// })``;

const Loading = styled(ActivityIndicator)`
margin-left: -25px;
`;

const LoadingContainer = styled.View`
position : absolute;
top : 50%;       
left : 50%;
`;
/*const RestaturentListContainer = styled.View`
flex:1;
padding: ${(props) => props.theme.space[3]};
backgroundColor: blue;
`;*/

export const RestaturentsScreen = ({ navigation }) => {
  const { error, isLoading, restaurant } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);
  //console.log(restaurant);
  //console.log( navigation);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <RestaurantList
        data={restaurant}
        renderItem={({ item }) => {
          // console.log(item);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  NewRestaurant: item,
                }) 
              }>
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaturentInfoCard restaurents={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
