import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import Home from '../../screens/Home'
import NavigationOptions from '../NavigationOptions'
const HomeStack = ({navigation, route}) => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={NavigationOptions} initialRouteName='Home'>
      <Stack.Screen component={Home} name='Home' />
    </Stack.Navigator>
  )
}
export default HomeStack
