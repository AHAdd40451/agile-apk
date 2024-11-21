import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from '../../../components'
import {colors} from '../../../theme'

const Card = ({children, onPress, cardStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, cardStyle]}>
      {children}
    </TouchableOpacity>
  )
}
export default Card

const styles = StyleSheet.create({
  card: {
    minHeight: 200,
    borderColor: colors.primary,
    borderWidth: 0.5,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    backgroundColor: '#fff',
  },
})
