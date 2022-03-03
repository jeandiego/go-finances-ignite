import React from 'react';
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
import { AppRoutes } from './routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded){
    return <AppLoading />
  }

  return (
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
          <NavigationContainer>
           <AppRoutes />
          </NavigationContainer>
      </ThemeProvider>
  );
}
