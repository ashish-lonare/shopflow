import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { useSplashScreenStyles } from './SplashScreen.styles';
import { Images } from '../../assets';

const SplashScreen: React.FC = () => {
  const styles = useSplashScreenStyles();
  return (
    <View style={styles.container}>
      <Image
        source={Images.logoBanner}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={styles.loaderColor.color} />
      </View>
    </View>
  );
};

export default SplashScreen;
