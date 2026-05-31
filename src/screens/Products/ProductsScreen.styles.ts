import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const useProductsScreenStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      alignSelf: 'flex-start',
    },
    centerContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
    },
    searchBarContainer: {
      marginHorizontal: 12,
      marginVertical: 12,
      borderRadius: 8,
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: theme.colors.border,
      borderWidth: 0.2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      overflow: 'hidden',
      elevation: 2,
    },
    searchBar: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '300',
    },
    listContent: {
      paddingHorizontal: 4,
      paddingBottom: 16,
    },

    emptyTextMsgContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: theme.colors.surfaceVariant,
      marginHorizontal: 4,
      padding: 20,
      borderColor: theme.colors.shadow,
      borderWidth: 0.3,
    },

    emptyIconContainer: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '200',
    },
    placeHolderTextColor: {
      color: theme.colors.textDisabled,
    },
    loaderColor: {
      color: theme.colors.primary,
    },
    emptyIcon: {
      color: theme.colors.text,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryList: {
      paddingVertical: 10,
    },

    categoryListContainer: {
      paddingHorizontal: 12,
    },

    categoryChip: {
      paddingHorizontal: 14,
      paddingVertical: 0,
      marginRight: 8,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
      height: 28,
      borderColor: theme.colors.border,
      borderWidth: 0.2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      overflow: 'hidden',
      elevation: 2,
    },

    selectedCategoryChip: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },

    categoryText: {
      color: theme.colors.textDisabled,
      fontSize: 14,
      lineHeight: 16,
      includeFontPadding: true,
      fontWeight: '300',
    },

    selectedCategoryText: {
      color: theme.colors.accent,
      fontWeight: '400',
    },
  });
};
