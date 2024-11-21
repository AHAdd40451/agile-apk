import React from 'react'
import {Image, StyleSheet, View} from 'react-native'

import {Text} from '../../components'
import images from '../../assets/images'
import {colors} from '../../theme'

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={images.logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 200,
    tintColor: colors.primary,
    resizeMode: 'contain',
    width: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
export default Splash
