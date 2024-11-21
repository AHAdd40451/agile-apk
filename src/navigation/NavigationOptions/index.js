import {Image, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'
import images from '../../assets/images'
import {colors, vw} from '../../theme'
import styles from './styles'
import {Context as AuthContext} from '../../context/AuthContext'
import Avatar from '../../components/Avatar'

const title = {
  CreatePost: 'Create Post',
  Comments: 'Comments',
  Events: 'Events',
  AddEvent: 'Add Events',
  EventDetails: 'Details',
}

const backButtonRoutes = {
  Comments: true,
  AddEvent: true,
  EventDetails: true,
  Webview: true,
  ChangePassword: true,
  UpdateProfile: true,
  EAP: true,
  SessionDetail: true,
  Profile: true,
}

const getHeaderTitle = props => {
  if (title[props?.route?.name]) {
    return title[props?.route?.name]
  }
  return ''
}

const headerLeft = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.goBack()}
      style={styles.cross}
    >
      <Image style={styles.inherit} source={images.backArrow} />
    </TouchableOpacity>
  )
}

const headerRight = (props, organization) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('ProfileStack')
      }}
    >
      <Avatar
        style={{
          marginRight: vw * 4,
        }}
      />
    </TouchableOpacity>
  )
}

export default NavigationOptions = props => {
  return {
    headerTransparent: true,
    headerShown: false,
    headerTitleStyle: [styles.headerTitleStyle],
    headerTitleAlign: 'center',
    headerRight: () => headerRight(props),
    headerLeft: () => headerLeft(props),
    headerStyle: {
      elevation: 0,
      backgroundColor: colors.primary,
      height: 80,
    },
    headerTitle: getHeaderTitle(props),
  }
}
