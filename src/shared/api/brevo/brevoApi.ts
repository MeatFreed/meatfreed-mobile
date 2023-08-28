import { createApi } from '@reduxjs/toolkit/query/react';
import { brevoQuery } from '../baseQuery';
import { BrevoRequest } from './models';

export const brevoApi = createApi({
  baseQuery: brevoQuery,
  reducerPath: 'brevoApi',
  endpoints: (builder) => ({
    createContact: builder.mutation<void, BrevoRequest>({
      query: ({
        email, firstName, lastName, userId,
      }) => ({
        url: '/v3/contacts',
        method: 'POST',
        body: {
          email,
          attributes: {
            firstName,
            lastName,
          },
          ext_id: userId,
          updateEnabled: true,
        },
      }),
    }),
  }),
});

export const { useCreateContactMutation } = brevoApi;
