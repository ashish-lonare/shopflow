import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../hooks/useAppTheme';

export const useUserInfoCardStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      gap: 6,
      backgroundColor: theme.colors.surface,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
    },
    avatarPlaceholder: {
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarPlaceholderText: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.text,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    meta: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 2,
    },
  });
};
