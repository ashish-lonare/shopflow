import { configureStore, Middleware } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import {
  authApiMiddleware,
  authApiReducer,
  authApiReducerPath,
} from '../features/auth/authApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

import {
  productApiMiddleware,
  productApiReducer,
  productApiReducerPath,
} from '../features/products/productApi';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const themePersistConfig = {
  key: 'theme',
  storage: AsyncStorage,
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const customLogger: Middleware<{}, {}> = storeAPI => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', storeAPI.getState());
  return result;
};

const customLogger2: Middleware<{}, {}> = storeAPI => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', storeAPI.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    auth: persistedAuthReducer,
    [authApiReducerPath]: authApiReducer,
    [productApiReducerPath]: productApiReducer,
    cart: persistedCartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApiMiddleware,
      productApiMiddleware,
      customLogger,
      customLogger2,
    ),
});

if (typeof window !== 'undefined') {
  (window as any).store = store;
}

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
