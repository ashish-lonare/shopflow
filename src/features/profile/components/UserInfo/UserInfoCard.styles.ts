import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../hooks/useAppTheme';

export const useUserInfoCardStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      gap: 6,
      backgroundColor: theme.colors.surfaceVariant,
    },
    card: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderColor: theme.colors.border,
      borderWidth: 0.2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginBottom: 8,
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${theme.colors.primary}1A`,
    },
    avatar: {
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover',
      width: 65,
      height: 65,
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
      fontSize: 18,
      fontWeight: '400',
      color: theme.colors.text,
      marginBottom: 4,
      letterSpacing: 0.2,
    },
    meta: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 2,
      fontWeight: '300',
      letterSpacing: 0.2,
    },
  });
};
