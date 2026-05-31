import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginRequest, RefreshRequest, RefreshResponse, UserResponse } from './types';
import { baseQuery } from '../../services/baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: baseQuery,

  endpoints: builder => ({
    login: builder.mutation<RefreshResponse, LoginRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
    refreshToken: builder.mutation<RefreshResponse, RefreshRequest>({
      query: refreshToken => ({
        url: '/auth/refresh',
        method: 'POST',
        body: {
          refreshToken,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery, useRefreshTokenMutation } = authApi;
