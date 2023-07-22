import React from 'react';
import { mocks, mockImages } from './mock';
import camelize from 'camelize';

export const restaurantsRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject('not yuo found');
    }
    resolve(mock);
  });
};
export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurants) => {
    restaurants.photos = restaurants.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });
    return {
      ...restaurants,
      address: restaurants.vicinity,
      isOpenNow:
        restaurants.opening_hours && restaurants.opening_hours.open_now,
      isClosedTemporarily: restaurants.business_status === 'CLOSED_TEMPORARILY',
    };
  });
  //console.log(mappedResults);
  return camelize(mappedResults);
};
restaurantsRequest()
  .then(restaurantsTransform)
  .then((transformedResponse) => {
    //console.log(transformedResponse);
  })
  .catch((Error) => {
    console.log(Error);
  });
