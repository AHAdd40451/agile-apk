import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import NavigationOptions from '../NavigationOptions'
import Chat from '../../screens/Chat'
import Messages from '../../screens/Messages'
const ChatStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={NavigationOptions}
      initialRouteName='ChatStack'
      
    >
      <Stack.Screen component={Chat} name='Chat' />
      <Stack.Screen component={Messages} name='Messages' />
    </Stack.Navigator>
  )
}
export default ChatStack
