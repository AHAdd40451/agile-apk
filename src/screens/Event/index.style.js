import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  banner: {height: 131},
  heading: {
    marginVertical: 12,
    fontFamily: 'Montserrat-Bold',
    fontSize: 21,
  },
  bedge: {
    height: 20,
    width: 20,
    backgroundColor: colors.primary,
    borderRadius: 12,
    zIndex: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    right: 12,
  },
  rightView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  subHeading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.primary,
  },
  img: {height: 10, width: 10, resizeMode: 'contain'},
  row: {flexDirection: 'row', marginTop: 20},
  subHeadingDesc: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginTop: 3,
    color: colors.themeBlack,
    lineHeight: 22,
  },
  rowContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.inputBorder,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  sub: {flex: 1, paddingRight: 12},
})

export default styles
