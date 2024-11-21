import {StyleSheet} from 'react-native'
import {colors, vh, vw} from '../../theme'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  avatar: {
    height: 90,
    width: 90,
    marginLeft: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 12,
    color: colors.themeBlack,
  },
  searchView: {
    flexDirection: 'row',
    borderWidth: 1,
    marginHorizontal: 20,
    height: 60,
    marginVertical: 10,
    borderColor: colors.primary,
  },
  email: {
    fontSize: 14,
    color: colors.themeBlack,
    marginVertical: 1,
    textAlign: 'center',
    marginVertical: 2,
  },
  text: {fontSize: 12, marginVertical: 2.5},
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
  },
  card: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
  },
  chat: {height: 30, marginVertical: 3, borderRadius: 4, width: '75%'},
})

export default styles
