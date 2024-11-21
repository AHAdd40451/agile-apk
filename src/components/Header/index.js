import React, {useEffect, useState, useContext} from 'react'
import {Image, View, TouchableOpacity} from 'react-native'
import styles from './styles'
import Text from '../Text'
import {colors} from '../../theme'
import images from '../../assets/images'
import {useNavigation} from '@react-navigation/native'

const Header = ({heading, leftView, rightView, back}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.headerContainer}>
      <View style={{flex: 1}}>
        {leftView ? (
          leftView
        ) : (
          <TouchableOpacity
            onPress={() =>
              back ? navigation.goBack() : navigation.openDrawer()
            }
            style={styles.menuBtn}
          >
            <Image
              source={back ? images.back : images.menu}
              style={{height: back ? 20 : 30, width: back ? 20 : 30}}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.header}>
        <Text text={heading} style={styles.heading} />
      </View>
      <View style={{flex: 1}}>{rightView}</View>
    </View>
  )
}
export default Header
