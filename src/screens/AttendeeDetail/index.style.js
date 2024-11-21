import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  avatar: {
    height: 110,
    width: 110,
    marginVertical: 12,
    alignSelf: 'center',
  },
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.themeBlack,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Montserrat-Medium',
  },
  title: {
    color: colors.themeBlack,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  row: {
    minHeight: 70,
    marginHorizontal: 10,
    flex: 1,
    width: '100%',
    marginVertical: 3,
  },
  chat: {
    borderRadius: 0,
    width: '100%',
    marginHorizontal: 0,
    height: 60,
  },
})

export default styles
