/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';



import Colors from './Colors';
import Acceuil from './screens/Accueil';
import Detail from './screens/Detail';
import File from './screens/File';
import Passager from './screens/Passager';
import CameraPage from './screens/CameraPage';
import GeolocationPage from './screens/GeolocationPage';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // const cameraPermission = await Camera.getCameraPermissionStatus()
  // const microphonePermission = await Camera.getMicrophonePermissionStatus()


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator /*screenOptions={{ headerShown: false }}*/>
          <Stack.Screen name="Acceuil" component={Acceuil}></Stack.Screen>
          <Stack.Screen name="Passager" component={Passager}></Stack.Screen>
          <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
          <Stack.Screen name="File" component={File}></Stack.Screen>
          <Stack.Screen name="CameraPage" component={CameraPage}></Stack.Screen>
          <Stack.Screen name="GeolocationPage" component={GeolocationPage}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
  );
};


export default App;
