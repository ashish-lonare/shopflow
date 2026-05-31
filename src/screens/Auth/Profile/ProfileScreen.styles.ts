import { StyleSheet } from "react-native";
import { useAppTheme } from "../../../hooks/useAppTheme";

export const useProfileSreenStyles = () => {
    const theme = useAppTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            gap: 6,
            backgroundColor: theme.colors.surface,
        },
    });
}