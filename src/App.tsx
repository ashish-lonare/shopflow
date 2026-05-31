import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { persistor, store } from './app/store';

import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import StartupManager from './components/StartupManager';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

function AppContent() {
  return (
    <NavigationContainer>
      <StartupManager />
    </NavigationContainer>
  );
}

export default App;
