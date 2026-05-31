import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  MainStackParamList,
} from './types';

export type AppNavigation =
  NativeStackNavigationProp<
    MainStackParamList
  >;

export const useAppNavigation =
  () =>
    useNavigation<AppNavigation>();