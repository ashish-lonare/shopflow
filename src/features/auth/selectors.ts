import { RootState } from '../../app/store';

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
