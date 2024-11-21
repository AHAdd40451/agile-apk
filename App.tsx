import 'react-native-gesture-handler';

import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import {store} from './src/store';
import {Provider} from 'react-redux';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Context as AuthContext} from './src/context/AuthContext';
import {SafeAreaView , StatusBar} from 'react-native';
import {addKeyToStorage, getValueFromStorage} from './src/helpers/asyncStorage';
import {useLazyGetUserQuery} from './src/services/auth';
import Splash from './src/screens/Splash';
import ChatStack from './src/navigation/ChatStack';
import {navigationRef} from './src/navigation/RootNavigation';
import notification from './src/helpers/notification';
import DrawerTab from './src/navigation/Drawer';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { colors } from './src/theme';
const AppContainer = () => {
  const {state, signin, splash} = useContext(AuthContext);

  const [getUserInfo, {isLoading}] = useLazyGetUserQuery();

  const Stack = createStackNavigator();

  useEffect(() => {
    createChannelId();
    async function onMessageReceived(message: any) {
      console.table('On Message Received');
    }

    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);

  const createChannelId = async () => {
    const channelId = await notifee.createChannel({
      id: 'reminder',
      name: 'DefaultChannel',
      sound: 'carhornpush',
    });
    await addKeyToStorage('channelId', JSON.stringify(channelId));
  };

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    await notification.createChannelId();
    const token = await getValueFromStorage('token');
    const userInfo = await getValueFromStorage('userInfo');
    if (token && userInfo) {
      const info = await getUserInfo({token, userId: JSON.parse(userInfo)._id});
      console.log('userInfo->', info);
      await addKeyToStorage(
        'userInfo',
        JSON.stringify(info?.data?.users?.data[0]),
      );
      signin(info?.data?.users?.data[0]);
    } else {
      splash();
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {state.loading ? (
          <>
            <Stack.Screen component={Splash} name="Splash" />
          </>
        ) : state.signIn ? (
          <>
            <Stack.Screen component={DrawerTab} name="DrawerTab" />
            <Stack.Screen component={ChatStack} name="ChatStack" />
          </>
        ) : (
          <Stack.Screen component={Login} name="Login" />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar  backgroundColor={colors.primary}/>
      <Provider store={store}>
        <AuthProvider>
          <AppContainer />
        </AuthProvider>
      </Provider>
      <SafeAreaView style={{backgroundColor: '#fff'}} />
    </SafeAreaView>
  );
}

export default App;
