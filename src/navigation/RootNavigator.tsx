import {useAppSelector} from '../app/hooks';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RootNavigator = () => {

  const isLoggedIn =
    useAppSelector(
      state => state.auth.isLoggedIn,
    );

  return isLoggedIn
    ? <MainNavigator />
    : <AuthNavigator />;
};

export default RootNavigator;