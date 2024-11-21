import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  btnStyle: {borderRadius: 0, marginHorizontal: 0, height: 50},
})

export default styles
