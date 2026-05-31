import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';

export const useLoginScreenStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      padding: 16,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      color: theme.colors.textSecondary,
    },
    inputContainer: {
      width: '100%',
      marginTop: 16,
    },
    inputStyles: {
      width: '100%',
      height: 40,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      color: theme.colors.textSecondary,
    },
    roundedBorder: {
      borderRadius: 8,
    },
    button: {
      width: '100%',
      height: 40,
      marginTop: 16,
      backgroundColor: theme.colors.primary,
    },
    buttonTxt: {
      color: theme.colors.accent,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: 40,
    },
    bannerContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bannerImage: {
      width: '75%',
      height: '75%',
      resizeMode: 'contain',
    },
    mainContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    buttonContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signUpBtnTxt: {
      color: theme.colors.info,
      fontSize: 14,
      fontWeight: '500',
    },
    placeHolderTextColor: {
      color: theme.colors.textSecondary,
    },
    errorContainer: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginTop: 8,
    },
  });
};
