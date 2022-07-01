import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import theme from './global/styles/theme';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import { Routes } from './routes';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const { userStorageLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const startingApp = !fontsLoaded || userStorageLoading;

  if (startingApp){
    return <AppLoading />
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <AuthProvider>
            <Routes />
        </AuthProvider>
      </ThemeProvider>
      </GestureHandlerRootView>
  );
}
