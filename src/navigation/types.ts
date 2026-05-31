import {
  NavigatorScreenParams,
} from '@react-navigation/native';

export type MainStackParamList = {
  Home: undefined;

  ProductDetails: {
    productId: number;
    addToCart?: boolean;
  };
};

export type RootTabParamList = {
  Products: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainStackParamList>;

  Auth: undefined;
};