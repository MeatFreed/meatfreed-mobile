import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { AnyType } from 'helpers';
import Config from 'react-native-config';

const { GOOGLE_API_URL } = Config as AnyType;

export const googleQuery = fetchBaseQuery({
  baseUrl: GOOGLE_API_URL as string,
});
