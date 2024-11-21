import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import NavigationOptions from '../NavigationOptions'
import Attendees from '../../screens/Attendees'
import AttendeesDetail from '../../screens/AttendeeDetail'
const AttendeesStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={NavigationOptions}
      initialRouteName='Attendees'
    >
      <Stack.Screen component={Attendees} name='Attendees' />
      <Stack.Screen component={AttendeesDetail} name='AttendeesDetail' />
    </Stack.Navigator>
  )
}
export default AttendeesStack
