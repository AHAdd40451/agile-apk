import React, {forwardRef, useState} from 'react'
import {Image, TextInput, TouchableOpacity, View} from 'react-native'
import images from '../../assets/images'
import {colors} from '../../theme'
import styles from './styles'
import {Text} from '../../components'

const InputField = forwardRef(
  (
    {
      containerStyle,
      style,
      iconStyle,
      placeholder,
      placeholderTextColor,
      onSubmitEditing,
      returnKeyType,
      onChangeText,
      numberOfLines,
      secureTextEntry = false,
      value,
      label,
      editable,
      keyboardType,
      textAlignVertical
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(secureTextEntry)
    return (
      <View style={styles.container}>
        {label ? <Text text={label} style={[styles.mb]} /> : null}
        <View style={[styles.mainView, containerStyle]}>
          <TextInput
            ref={ref}
            onChangeText={onChangeText}
            secureTextEntry={showPassword}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : colors.gray
            }
            value={value}
            editable={editable}
            returnKeyType={returnKeyType ? returnKeyType : 'next'}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            numberOfLines={numberOfLines}
            keyboardType = {keyboardType}
            // keyboardType = {''}
            textAlignVertical = {textAlignVertical}
            style={[styles.textInput, style]}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.iconView}
            >
              <Image
                style={[styles.icon, iconStyle]}
                source={showPassword ? images.eyeClosed : images.eyeOpen}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  },
)
export default InputField
