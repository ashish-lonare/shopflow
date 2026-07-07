import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import CartScreen from '../Cart/CartScreen';
import ProductsScreen from '../Products/ProductsScreen';
import ProfileScreen from '../Auth/Profile/ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert, Image, TouchableOpacity, Text } from 'react-native';
import { logout } from '../../features/auth/authSlice';

import { Images } from '../../assets';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useHomeScreenStyles from './HomeScreen.styles';
import { clearCart } from '../../features/cart/cartSlice';

const Tab = createBottomTabNavigator<RootTabParamList>();

type TabRouteName = 'Products' | 'Cart' | 'Profile';

type RootTabParamList = {
  Products: undefined;
  Cart: undefined;
  Profile: undefined;
};

const iconMap: Record<keyof RootTabParamList, string> = {
  Products: 'store',
  Cart: 'shopping-cart',
  Profile: 'settings-accessibility',
};

const buildTabScreenOptions =
  (onLogout: () => void, styles: ReturnType<typeof useHomeScreenStyles>) =>
  ({
    route,
  }: {
    route: { name: TabRouteName };
  }): BottomTabNavigationOptions => ({
    headerRight: () => (
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <MaterialIcons
          name="logout"
          size={24}
          color={styles.logoutButtonIcon.color}
        />
      </TouchableOpacity>
    ),
    headerTitle: () => <HeaderLogo styles={styles} />,
    // headerTitleStyle: {
    //   fontWeight: '200',
    //   color: styles.tabBarActiveTintColor.color,
    // },
    headerStyle: {
      backgroundColor: styles.backgroundColor.color,
    },
    headerTintColor: styles.headerTintColor.color,

    // ✅ Bottom tab icons
    tabBarIcon: ({ color, size, focused }) => (
      <MaterialIcons
        name={iconMap[route.name]}
        size={focused ? size + 3 : size}
        color={color}
      />
    ),

    tabBarShowLabel: true,
    tabBarLabel: ({ focused, children }) =>
      focused ? <Text style={styles.tabLabel}>{children}</Text> : null,
    tabBarActiveTintColor: styles.tabBarActiveTintColor.color,
    tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color,
    tabBarStyle: styles.tabBarStyle,
  });

const HeaderLogo = ({
  styles,
}: {
  styles: ReturnType<typeof useHomeScreenStyles>;
}) => <Image source={Images.logoHeader} style={styles.headerLogoStyle} />;

const HomeScreen = () => {
  const styles = useHomeScreenStyles();
  const dispatch = useAppDispatch();
  const cartItemsQuantity = useAppSelector(state =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );
  const badgeCount = cartItemsQuantity > 0 ? cartItemsQuantity : undefined;

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(clearCart());
          dispatch(logout());
        },
      },
    ]);
  };

  return (
    <Tab.Navigator screenOptions={buildTabScreenOptions(handleLogout, styles)}>

      <Tab.Screen name="Products" component={ProductsScreen} />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: badgeCount,
          tabBarBadgeStyle: styles.tabBarBadgeStyle,
        }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
};

export default HomeScreen;
