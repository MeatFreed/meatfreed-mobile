import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { AnyType } from 'helpers';
import Config from 'react-native-config';

const { GOOGLE_API_URL, COURIER_API_URL, COURIER_API_KEY } = Config as AnyType;

export const googleQuery = fetchBaseQuery({
  baseUrl: GOOGLE_API_URL,
});

export const courierQuery = fetchBaseQuery({
  baseUrl: COURIER_API_URL,
  prepareHeaders: (headers) => {
    if (COURIER_API_KEY) {
      headers.set('Authorization', `Bearer ${COURIER_API_KEY}`);
    }

    return headers;
  },
});
