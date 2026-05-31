import { StyleSheet } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";

export const useSplashScreenStyles = () => {
    const theme = useAppTheme();
    return StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 50,
  },
  loaderColor : {
    color: theme.colors.primary,
  }
});
};