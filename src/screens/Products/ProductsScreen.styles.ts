import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const useProductsScreenStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchBar: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 12,
      marginVertical: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      fontSize: 14,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    listContent: {
      paddingHorizontal: 8,
      paddingBottom: 16,
    },
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
      borderWidth: 1,
    },
    thumbnail: {
      width: 100,
      height: 100,
      backgroundColor: theme.colors.surfaceVariant,
    },
    productInfo: {
      flex: 1,
      padding: 12,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    category: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginBottom: 2,
    },
    brand: {
      fontSize: 12,
      color: theme.colors.textDisabled,
      marginBottom: 8,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    discountedPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    originalPrice: {
      fontSize: 12,
      color: theme.colors.textDisabled,
      textDecorationLine: 'line-through',
    },
    discount: {
      fontSize: 12,
      color: theme.colors.secondary,
      fontWeight: '600',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
  });
};
