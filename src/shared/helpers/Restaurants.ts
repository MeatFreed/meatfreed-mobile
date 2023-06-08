import { RestaurantOpeningHours } from 'api';
import dayjs from 'dayjs';

const currentDay = dayjs().day() - 1;

export const getDistanceToPlace = (distance: number) => {
  const isMeter = distance < 1;

  const value = isMeter ? Math.ceil(distance * 1000) : Math.ceil(distance);

  return `${Number.isNaN(value) ? 0 : value}${isMeter ? 'm' : 'km'}`;
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
