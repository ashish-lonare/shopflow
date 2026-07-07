import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../../../hooks/useAppTheme';

export const useAppInfoCardStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    contentContainer: {
      flexGrow: 1,
    },
    section: {
      flex: 1,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 16,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      marginBottom: 12,
      borderColor: theme.colors.border,
      borderWidth: 0.3,
      elevation: 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    settingLabel: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
      marginLeft: 8,
    },
    versionText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    bottomSettingItem: {
      marginTop: 'auto',
    },
    thumbColor: {
      color: theme.colors.primary,
    },
    iconColor: {
      color: theme.colors.icon,
    },
  });
};
