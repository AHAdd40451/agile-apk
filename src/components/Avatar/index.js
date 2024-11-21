import React, {useContext} from 'react'
import styles from './styles'
import {Context as AuthContext} from '../../context/AuthContext'
import images from '../../assets/images'
import FastImage from 'react-native-fast-image'
const Avatar = ({style, img}) => {
  const {state} = useContext(AuthContext)
  const userInfo = state.user

  return (
    <FastImage
      style={[styles.avatar, style]}
      source={
        img || userInfo.picture
          ? {uri: img ? img : userInfo.picture}
          : images.user_without_image
      }
    />
  )
}
export default Avatar
