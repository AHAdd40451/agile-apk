import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  lastMsg: {
    fontSize: 12,
    color: colors.themeBlack,
    fontFamily: 'Montserrat-Regular',
  },
  name: {fontFamily: 'Montserrat-SemiBold'},
  chatContainer: {
    height: 80,
    borderBottomColor: colors.inputBorder,
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vh * 2,
  },
})

export default styles
