import React from 'react'
import {View} from 'react-native'

import Lottie from 'lottie-react-native'

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Lottie
        source={require('../../assets/animations/loading.json')}
        autoPlay
        loop
      />
    </View>
  )
}

export default Loader
