import { createApi } from '@reduxjs/toolkit/query/react';
import { LocalizationService } from 'services';
import Config from 'react-native-config';
import { googleQuery } from '../baseQuery';
import { RestaurantResponse, RestaurantInformation } from './models';

const defaultParams = {
  language: LocalizationService.getLanguage(),
  key: Config.GOOGLE_API_KEY as string,
};

export const googleApi = createApi({
  baseQuery: googleQuery,
  reducerPath: 'googleApi',
  endpoints: (builder) => ({
    getRestaurantByID: builder.query<RestaurantInformation, string>({
      query: (placeId) => ({
        url: '/maps/api/place/details/json',
        params: { ...defaultParams, place_id: placeId },
      }),
      transformResponse: (response: RestaurantResponse) => response.result,
    }),
  }),
});

export const { useGetRestaurantByIDQuery } = googleApi;
