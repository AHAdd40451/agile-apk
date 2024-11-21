import React, {useEffect, useState, useContext} from 'react'
import {TouchableOpacity, ActivityIndicator} from 'react-native'
import styles from './styles'
import Text from '../Text'
import {Context as AuthContext} from '../../context/AuthContext'

const Button = ({style, title, loading, disabled, titleStyle, onPress}) => {
  const {state} = useContext(AuthContext)
  const [theme, setTheme] = useState('')

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      style={[styles.mainView, (disabled || loading) && {opacity: 0.6}, style]}
    >
      {loading ? (
        <ActivityIndicator
          style={{marginRight: 12}}
          color={'#fff'}
          size={'small'}
        />
      ) : null}
      <Text style={[styles.textStyle, titleStyle]} text={title} />
    </TouchableOpacity>
  )
}
export default Button
