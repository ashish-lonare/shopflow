import { useAppTheme } from '../../hooks/useAppTheme';
import { StyleSheet } from 'react-native';

const useQuantitySelectorStyles = (isCompact: boolean = false) => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: { marginBottom: isCompact ? 0 : 16 },
    addToCartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderRadius: isCompact ? 15 : 20,
      borderColor: theme.colors.primary,
      borderWidth: 0.4,
      overflow: 'hidden',
      backgroundColor: `${theme.colors.primary}1A`,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      marginTop: isCompact ? 0 : 8,
    },
    label: {
      fontSize: isCompact ? 14 : 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: isCompact ? 4 : 8,
    },
    quantityText: {
      width: isCompact ? 30 : 40,
      textAlign: 'center',
      fontSize: isCompact ? 14 : 16,
      fontWeight: '400',
      color: theme.colors.text,
    },
    addToCartButton: {
      width: isCompact ? 30 : 36,
      height: isCompact ? 30 : 36,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${theme.colors.primary}1A`,
    },
    addToCartIcon: {
      color: theme.colors.primary,
    },
  });
};

export default useQuantitySelectorStyles;
