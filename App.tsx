import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { enableLatestRenderer } from 'react-native-maps';
import { RootNavigator } from 'navigation';
import { persistor, store } from 'stores';

enableLatestRenderer();

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

const App: React.FC = () => (
  <GestureHandlerRootView style={styles.layout}>
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

          <RootNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default App;
