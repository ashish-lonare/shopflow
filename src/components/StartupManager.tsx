import React, { useEffect, useState } from 'react';

import RootNavigator from '../navigation/RootNavigator';

import SplashScreen from '../screens/Splash/SplashScreen';

const StartupManager = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const minimumSplash = new Promise<void>(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });

        await Promise.all([minimumSplash]);
      } finally {
        setIsReady(true);
      }
    };

    initialize();
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  return <RootNavigator />;
};

export default StartupManager;
