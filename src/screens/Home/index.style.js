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
  },
  filterBtnView: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
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
  rightView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
})

export default styles
