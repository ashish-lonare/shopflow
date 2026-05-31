import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RefreshResponse } from './types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setTokens: (state, action: PayloadAction<RefreshResponse>) => {
      console.log(action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
    logout: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setTokens, logout } = authSlice.actions;

export default authSlice.reducer;
