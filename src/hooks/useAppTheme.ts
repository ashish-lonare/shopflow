// useAppTheme.ts

import {useAppSelector} from '../app/hooks';
import {lightTheme} from '../theme/lightTheme';
import {darkTheme} from '../theme/darkTheme';

export const useAppTheme = () => {
  const mode = useAppSelector(
    state => state.theme.mode,
  );

  return mode === 'light'
    ? lightTheme
    : darkTheme;
};