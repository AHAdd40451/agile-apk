import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
    // backgroundColor: colors.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    borderBottomColor: colors.inputBorder,
    borderBottomWidth: 1,
  },
  heading: {
    color: colors.themeBlack,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
  },
  menuBtn: {flex: 1, justifyContent: 'center', alignItems: 'center'},
})
export default styles
