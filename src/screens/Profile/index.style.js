import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filterBtn: {
    height: 40,
    width: 80,
    borderColor: colors.lightGray,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  filterBtnView: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    padding: vh,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  chosenTxt: {color: colors.white},
  chosenBg: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  avatar: {height: 80, width: 80},
  topView: {marginTop: 12, alignItems: 'center'},
  row: {
    height: 50,
    borderBottomColor: colors.inputBorder,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {fontFamily: 'Montserrat-SemiBold', marginTop: 20},
  detail: {
    fontFamily: 'Montserrat-Medium',
    marginTop: 4,
    color: colors.themeBlack,
  },
})

export default styles
