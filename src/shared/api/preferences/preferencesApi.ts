import { createApi } from '@reduxjs/toolkit/query/react';
import { courierQuery } from '../baseQuery';
import {
  GetPreferencesResponse, UpdatePreferenceResponse, UpdatePreferenceParams, Preference,
} from './models';

export const preferencesApi = createApi({
  baseQuery: courierQuery,
  reducerPath: 'preferencesApi',
  tagTypes: ['preference'],
  endpoints: (builder) => ({
    getPreferences: builder.query<Preference[], string>({
      query: (userId) => ({
        url: `/users/${userId}/preferences`,
      }),
      providesTags: ['preference'],
      transformResponse: (response: GetPreferencesResponse) => response.items,
    }),
    updatePreference: builder.mutation<UpdatePreferenceResponse, UpdatePreferenceParams>({
      query: ({ userId, topicId, status }) => ({
        url: `/users/${userId}/preferences/${topicId}`,
        method: 'PUT',
        body: {
          topic: {
            status,
          },
        },
      }),
      invalidatesTags: ['preference'],
    }),
  }),
});

export const { useGetPreferencesQuery, useUpdatePreferenceMutation } = preferencesApi;
