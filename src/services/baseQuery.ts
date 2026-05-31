import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { RootState } from '../app/store';

import { logout, setTokens } from '../features/auth/authSlice';
import { RefreshResponse } from '../features/auth/types';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://dummyjson.com',

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());

      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: {
          refreshToken,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const tokens = refreshResult.data as RefreshResponse;

      api.dispatch(setTokens(tokens));

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
