import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tableHeading: {
    backgroundColor: colors.green,
    padding: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  meetingView: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    marginLeft: 12,
    padding: 2,
    paddingHorizontal: 6,
  },
  meeting: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent : "space-between"
  },
  meetingCard: {
    minHeight: 120,
    padding: 12,
    marginVertical: 12,
    borderWidth: 0,
    borderBottomWidth: 0.5,
  },
})

export default styles
