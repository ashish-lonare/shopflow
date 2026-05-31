import React from 'react';
import { View, Text } from 'react-native';
import { useCurrentThemeCardStyles } from './CurrentThemeCard.styles';
import { useAppSelector } from '../../../../app/hooks';


export const CurrentThemeCard: React.FC = () => {
  const styles = useCurrentThemeCardStyles();
  const themeMode = useAppSelector(state => state.theme.mode);
  return (
    <View style={styles.container}>
      <View style={styles.themeRow}>
        <Text style={styles.themeText}>{themeMode.charAt(0).toUpperCase() + themeMode.slice(1) + " Mode"}</Text>
      </View>
    </View>
  );
};  
