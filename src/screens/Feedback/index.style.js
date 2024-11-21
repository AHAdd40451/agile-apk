import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomColor: colors.inputBorder,
    borderBottomWidth: 0.8,
  },
  starRowTitle: {
    color: colors.themeBlack,
    fontSize: 15,
    flex : 1,
    paddingRight : 5,
    fontFamily: 'Montserrat-Medium',
  },
  questionTitle: {
    color: colors.themeBlack,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginVertical: 12,
    marginTop : 20
  },
  desc: {
    color: colors.themeBlack,
    fontSize: 14,
    lineHeight: 25,
  },
  dear: {
    color: colors.themeBlack,
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginVertical: 12,
  },
})

export default styles
