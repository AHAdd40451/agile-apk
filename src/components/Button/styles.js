import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.primary,
    // marginTop: vh * 5,
    borderRadius: vw * 4,
    height: vh * 7.5,
    width: '100%',
    marginHorizontal : vw ,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
export default styles
