import React, { useContext, useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import { Search } from '../components/map.search';
import { LocationContext } from '../../../services/location/location.context';
import { RestaurantsContext } from '../../../services/restaurant/restaurants.context';
import { MapCallout } from '../components/map-callout.components';

const Map = styled(MapView)`
  height: 100%;
  width: 100%; 
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurant = [] } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);
  //console.log("Bidyut....");
  //console.log(restaurant);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}>
        {restaurant.map((rest) => {
          return (
            <MapView.Marker
              key={rest.name}
              title={rest.name}
              coordinate={{
                latitude: rest.geometry.location.lat,
                longitude: rest.geometry.location.lng,
              }}>
              <MapView.Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { NewRestaurant:rest })
                }>
                <MapCallout restCallOut={rest} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </>
  );
};
