import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../hooks/useAppTheme';

export const useCurrentThemeCardStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginVertical: 8,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    themeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    themeText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
    },
  });
};
