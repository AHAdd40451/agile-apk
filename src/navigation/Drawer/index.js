import React, {useState, useEffect, useContext} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import styles from './styles'
import {colors} from '../../theme'
import {Context as AuthContext} from '../../context/AuthContext'

import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from '../../screens/Home'
import Meetings from '../../screens/Meetings'
import PersonalAgenda from '../../screens/PersonalAgenda'
import Attendees from '../../screens/Attendees'
import Profile from '../../screens/Profile'
import CustomDrawerContentComponent from '../CustomDrawer'
import Feedback from '../../screens/Feedback'
import EventBook from '../../screens/EventBook'
import Event from '../../screens/Event'
import AttendeesStack from '../AttendeesStack'

const DrawerTab = () => {
  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContentComponent {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        drawerActiveTintColor: colors.white,
        drawerActiveBackgroundColor: colors.primary,
        drawerLabelStyle: {fontFamily: 'Montserrat-SemiBold'},
      }}
      initialRouteName={'Event'}
    >
      
      <Drawer.Screen name='Event' component={Event} />
      <Drawer.Screen name='EventAgenda' component={Home} />
      <Drawer.Screen name='Meeting' component={Meetings} />
      <Drawer.Screen name='Personal' component={PersonalAgenda} />
      <Drawer.Screen name='Attendee' component={AttendeesStack} />
      <Drawer.Screen name='Profile' component={Profile} />
      <Drawer.Screen name='Feedback' component={Feedback} />
      <Drawer.Screen name='EventBooklet' component={EventBook} />
      
    </Drawer.Navigator>
  )
}
export default DrawerTab
