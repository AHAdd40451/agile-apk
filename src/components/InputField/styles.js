import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vh * 6.5,
    borderRadius: vw * 3,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  container: {
    // paddingHorizontal: vw * 2,
    marginBottom: vh * 2,
    width: '100%',
  },
  textInput: {
    height: '100%',
    paddingLeft : 12,
    fontFamily: 'Montserrat-SemiBold',
    width: '90%',
  },
  iconView: {
    height: '100%',
    width: '10%',
  },
  icon: {
    height: '100%',
    width: '70%',
    resizeMode: 'contain',
  },
  mb : {
    marginBottom : vh,
    fontFamily : "Montserrat-Medium"
  }

})
export default styles
