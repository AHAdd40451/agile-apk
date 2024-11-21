import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import PersonalAgenda from '../../screens/PersonalAgenda'

import NavigationOptions from '../NavigationOptions'
const PersonalStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={NavigationOptions}
      initialRouteName='PersonalAgenda'
    >
      <Stack.Screen component={PersonalAgenda} name='PersonalAgenda' />
    </Stack.Navigator>
  )
}

export default PersonalStack
