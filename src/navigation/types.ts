import {
  NavigatorScreenParams,
} from '@react-navigation/native';

export type MainStackParamList = {
  Home: NavigatorScreenParams<RootTabParamList>;
  ProductDetails: {
    productId: number;
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