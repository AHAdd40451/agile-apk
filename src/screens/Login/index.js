import React, {useRef, useState, useContext} from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native'
import styles from './styles'
import images from '../../assets/images'
import {Button, InputField, Text} from '../../components'
import {useLazyGetUserQuery, useLoginMutation} from '../../services/auth'
import {Context as AuthContext} from '../../context/AuthContext'
import {addKeyToStorage} from '../../helpers/asyncStorage'
import {colors} from '../../theme'
import messaging from '@react-native-firebase/messaging'

const Login = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    type: '',
    isError: false,
    errorMsg: '',
  })
  const passwordRef = useRef(null)

  const {signin} = useContext(AuthContext)

  const [loginUser, {data, isLoading}] = useLoginMutation()

  const [
    getUserInfo,
    {user: user, isLoading: isLoadingUser},
  ] = useLazyGetUserQuery()

  const validateEmail = email => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }

  async function requestUserPermission () {
    try {
      let token = null

      const authStatus = await messaging().requestPermission()
      console.log('authStatus', authStatus)
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      if (enabled) {
        const isRegistered = await messaging().registerDeviceForRemoteMessages()
        token = await messaging().getToken()
      }

      return token
    } catch (error) {}
  }

  const handleOnClickLogin = async () => {
    if (!validateEmail(email)) {
      setError({
        isError: true,
        type: 'email',
        errorMsg: 'Please put valid email address',
      })
      return
    }
    const deviceToken = await requestUserPermission()

    const obj = {
      email: email,
      password: password,
      device_token: deviceToken || '',
    }

    const loggedIn = await loginUser(obj)
    console.log('loggedIn--->', loggedIn)

    if (loggedIn.error) {
      alert(loggedIn?.error?.data?.message)
    } else {
      await addKeyToStorage('token', loggedIn.data.token)
      const info = await getUserInfo({
        token: loggedIn.data.token,
        userId: loggedIn?.data?.user._id,
      })
      await addKeyToStorage(
        'userInfo',
        JSON.stringify(info?.data?.users?.data[0]),
      )
      signin(info?.data?.users?.data[0])
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <View style={styles.mainView}>
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            style={styles.inputView}
          >
            <View style={styles.logoView}>
              <Image
                style={[styles.logo, {tintColor: colors.primary}]}
                source={images.logo}
              />
            </View>
            <InputField
              onChangeText={text => {
                setEmail(text)
                setError({
                  type: '',
                  isError: false,
                  errorMsg: '',
                })
              }}
              returnKeyType='next'
              value={email}
              placeholder={'Email Address'}
              keyboardType={'email-address'}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            {error.isError && error.type === 'email' ? (
              <Text
                text={error.errorMsg}
                style={{color: 'red', marginBottom: 12, marginTop: -20}}
              />
            ) : null}
            <InputField
              onChangeText={setPassword}
              returnKeyType='send'
              ref={passwordRef}
              value={password}
              secureTextEntry
              placeholder={'Password'}
            />

            <Button
              onPress={handleOnClickLogin}
              titleStyle={styles.loginText}
              loading={isLoading || isLoadingUser}
              title={'Login'}
              disabled={email === '' || password === ''}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default Login
