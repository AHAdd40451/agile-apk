import React, {useContext} from 'react'
import {View} from 'react-native'
import styles from './index.style'
import {WebView} from 'react-native-webview'

import {Context as AuthContext} from '../../context/AuthContext'

const Webview = ({route}) => {
  // const {url} = route?.params
  const {state} = useContext(AuthContext)
  const organization = state?.user?.employer_of_org

  return (
    <View style={styles.mainView}>
      <WebView style={{flex: 1}} source={{uri: organization.website}} />
    </View>
  )
}
export default Webview
