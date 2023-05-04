import { RestaurantOpeningHours } from 'api';
import dayjs from 'dayjs';
import { getDistance } from 'geolib';
import { LatLng } from 'react-native-maps';

const currentDay = dayjs().day() - 1;

export const getDistanceToPlace = (currentLocation: LatLng, placeLocation: LatLng) => {
  const distance = getDistance(currentLocation, placeLocation);

  const isKilometer = distance >= 1000;

  const value = isKilometer ? Math.ceil(distance / 1000) : distance;

  return `${value}${isKilometer ? 'km' : 'm'}`;
};

export const getHours = (openingHours?: RestaurantOpeningHours) => {
  const isOpeningNow = openingHours?.open_now;

  const weekdays = openingHours?.weekday_text || [];

  const date = weekdays?.[currentDay]?.split(': ');

  const isClosed = date?.[1] === 'Closed';

  const adapt = weekdays.map((item, index) => ({ index, day: item }));

  const filterByStatus = adapt.filter((item) => !item.day?.includes('Closed'));

  const future = filterByStatus.find((item) => item.index >= currentDay) || filterByStatus?.[0];

  if (isOpeningNow) {
    return 'Open now';
  }

  if (!isOpeningNow && !isClosed && date?.[1]?.split(' – ')?.[0]) {
    return `Open at ${date?.[1]?.split(' – ')?.[0]}`;
  }

  if (isClosed && future) {
    return `Open ${future.day?.split(': ')?.[0]}`;
  }

  return '';
};
