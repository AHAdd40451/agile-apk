import {StyleSheet} from 'react-native'
import {colors, vw} from '../../theme'

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: vw * 15,
    width: vw * 15,
    borderRadius: 125,
    marginLeft : vw * 4
  },
  profile: {
    marginRight: vw * 4,

    height: vw * 12,
    width: vw * 12,
    borderRadius: (vw * 12) / 2,
  },
  addIcon: {
    marginRight: vw * 4,
    resizeMode: 'contain',
    height: vw * 6,
    width: vw * 10,
  },
  inherit: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  cross: {
    marginLeft: vw * 4,
    width: vw * 5,
    height: vw * 5,
  },
  headerTitleStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
})
export default styles
