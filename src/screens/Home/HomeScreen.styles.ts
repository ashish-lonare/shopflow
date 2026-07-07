import { useAppTheme } from '../../hooks/useAppTheme';
import { StyleSheet } from 'react-native';

const useHomeScreenStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    logoutButton: {
      marginRight: 15,
    },
    tabLabel: {
      fontSize: 11,
      fontWeight: '400',
      color: theme.colors.primary,
    },
    headerLogoStyle: { width: 140, height: 80, resizeMode: 'contain' },
    logoutButtonIcon: {
      color: theme.colors.primary,
    },
    tabBarBadgeStyle: {
      backgroundColor: theme.colors.error,
      color: theme.colors.accent,
    },
    tabBarActiveTintColor: {
      color: theme.colors.primary,
    },
    tabBarInactiveTintColor: {
      color: theme.colors.text + '80',
    },
    tabBarStyle: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.surface,
      borderTopWidth: 1,
    },
    backgroundColor: {
        color: theme.colors.background,
    },
    headerTintColor: {
        color: theme.colors.text,
    }
  });
};

export default useHomeScreenStyles;
