import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetails/ProductDetailsScreen';
import { useAppTheme } from '../hooks/useAppTheme';
import Feather from 'react-native-vector-icons/FontAwesome6';
// import { useAppNavigation } from './hooks';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AppTheme } from '../theme/types';
import { Images } from '../assets';
const Stack = createNativeStackNavigator();

const HeaderBackButton = ({ onPress, theme }: { onPress: () => void; theme: AppTheme }) => (
  <TouchableOpacity style={styles.backButton} onPress={onPress}>
    <Feather name="chevron-left" size={24} color={theme.colors.primary} />
  </TouchableOpacity>
);

const renderHeaderLeft = (navigation: any, theme: AppTheme) => (
  <HeaderBackButton onPress={navigation.goBack} theme={theme} />
);

const HeaderLogo = () => (
  <Image source={Images.logoHeader} style={styles.headerLogoStyle} />
);

const renderHeaderLogo = () => (
  <HeaderLogo />
);


const MainNavigator = () => {
  const theme = useAppTheme();
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => renderHeaderLeft(navigation, theme),
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.colors.primary,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitle: () => renderHeaderLogo(),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerLogoStyle: { width: 140, height: 80, resizeMode: 'contain' },
});

export default MainNavigator;
