import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import NavigationOptions from '../NavigationOptions'
import Profile from '../../screens/Profile'
const ProfileStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={NavigationOptions}
      initialRouteName='Profile'
      
    >
      <Stack.Screen component={Profile} name='Profile' />
    </Stack.Navigator>
  )
}
export default ProfileStack
