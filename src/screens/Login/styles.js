import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: vw * 3,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  logoView: {
    marginTop: vh * 10,
    marginBottom: vh * 4,
    paddingHorizontal: vw * 4,
    height: vh * 20,
    width: '100%',
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  inputView: {
    paddingHorizontal: vw * 7,
  },
  forgotPass: {
    color: colors.green,
  },
  rightAlign: {
    alignSelf: 'flex-end',
  },
  loginText: {
    color: colors.white,
  },
})
export default styles
