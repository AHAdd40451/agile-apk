import React from 'react'
import {Text} from 'react-native'
import styles from './styles'

const CustomText = ({style, text, children, numberOfLines}) => {
  return (
    <Text
      allowFontScaling={false}
      // adjustsFontSizeToFit
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style]}
    >
      {text || children}
    </Text>
  )
}

export default CustomText
