import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import CartScreen from '../Cart/CartScreen';
import ProductsScreen from '../Products/ProductsScreen';
import ProfileScreen from '../Auth/Profile/ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { AppTheme } from '../../theme/types';
import { logout } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../app/hooks';
import { Images } from '../../assets';

const Tab = createBottomTabNavigator<RootTabParamList>();

type TabRouteName = 'Products' | 'Cart' | 'Profile';

type RootTabParamList = {
  Products: undefined;
  Cart: undefined;
  Profile: undefined;
};

const iconMap: Record<keyof RootTabParamList, string> = {
  Products: 'inventory',
  Cart: 'shopping-cart',
  Profile: 'person',
};

const buildTabScreenOptions =
  (onLogout: () => void, theme: AppTheme) =>
  ({
    route,
  }: {
    route: { name: TabRouteName };
  }): BottomTabNavigationOptions => ({
    headerRight: () => (
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    ),
    headerTitle: () => <HeaderLogo />,
    headerTitleStyle: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.text,

    // ✅ Bottom tab icons
    tabBarIcon: ({ color, size }) => (
      <MaterialIcons
        name={iconMap[route.name]}
        size={size}
        color={color} // ✅ use provided color
      />
    ),

    // ✅ Tab colors (use your theme)
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.text + '80',

    tabBarStyle: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.surface,
      borderTopWidth: 1,
    },
  });

const HeaderLogo = () => (
  <Image source={Images.logoHeader} style={styles.headerLogoStyle} />
);

const HomeScreen = () => {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  return (
    <Tab.Navigator screenOptions={buildTabScreenOptions(handleLogout, theme)}>
      <Tab.Screen name="Products" component={ProductsScreen} />

      <Tab.Screen name="Cart" component={CartScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
  },
  headerLogoStyle: { width: 140, height: 80, resizeMode: 'contain' },
});

export default HomeScreen;
