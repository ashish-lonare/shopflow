import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';

export const useProductItemStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    productCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      marginHorizontal: 8,
      marginBottom: 12,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderColor: theme.colors.border,
      borderWidth: 0.2,
    },

    thumbnail: {
      width: 100,
      height: 100,
      backgroundColor: `${theme.colors.primary}1A`,
       borderBottomRightRadius: 8,
    },
    productInfo: {
      flex: 1,
      padding: 12,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 14,
      fontWeight: '400',
      color: theme.colors.text,
      marginBottom: 4,
    },
    categoryContainer: {
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginBottom: 4,
      alignSelf: 'flex-start',
    },
    category: {
      fontSize: 10,
      color: theme.colors.accent,
      marginBottom: 2,
      fontWeight: '400',
    },
    brand: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginBottom: 8,
      fontWeight: '300',
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    priceMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flexShrink: 1,
    },
    discountedPrice: {
      fontSize: 14,
      fontWeight: '400',
      color: theme.colors.primary,
    },
    originalPrice: {
      fontSize: 12,
      color: theme.colors.textDisabled,
      textDecorationLine: 'line-through',
      fontWeight: '300',
    },
    discount: {
      fontSize: 12,
      color: theme.colors.secondary,
      fontWeight: '400',
    },
    addToCartButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${theme.colors.primary}1A`,
      borderWidth: 0.4,
      borderColor: theme.colors.primary,
      marginLeft: 8,
      overflow: 'hidden',
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    addToCartIcon: {
      color: theme.colors.primary,
    },
    brandQuantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
};
