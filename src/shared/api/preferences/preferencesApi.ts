import { createApi } from '@reduxjs/toolkit/query/react';
import { courierQuery } from '../baseQuery';
import {
  GetPreferencesResponse,
  UpdatePreferenceResponse,
  UpdatePreferenceParams,
  Preference, UpdateProfileParams,
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
    updateProfile: builder.mutation<void, UpdateProfileParams>({
      query: ({ userId, ...rest }) => ({
        url: `/profiles/${userId}`,
        method: 'PUT',
        body: {
          profile: {
            ...rest,
            email_verified: true,
          },
        },
      }),
    }),
  }),
});

export const {
  useGetPreferencesQuery, useUpdatePreferenceMutation, useUpdateProfileMutation,
} = preferencesApi;
