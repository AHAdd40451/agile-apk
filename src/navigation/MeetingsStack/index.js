import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import NavigationOptions from '../NavigationOptions'
import Meetings from '../../screens/Meetings'
const MeetingsStack = ({navigation, route}) => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={NavigationOptions}
      initialRouteName='Meetings'
    >
      <Stack.Screen component={Meetings} name='Meetings' />
    </Stack.Navigator>
  )
}
export default MeetingsStack
