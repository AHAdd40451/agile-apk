import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from '../../../components'
import {colors} from '../../../theme'

import Card from './Card'

const NetworkingCard = ({item}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title || 'Networking Session'}</Text>
        <View>
          <View style={styles.timeView}>
            <Text style={{fontSize: 12}}>
              {item?.start_time} - {item?.end_time}
            </Text>
          </View>
          <Text style={styles.exhibition}>{`(Exhibition Hall)`}</Text>
        </View>
      </View>
      <View style={styles.box}>
        {item?.meetings.map((v, i) => {
          return (
            <View key={i} style={styles.meetingView}>
              <View>
                <Text style={styles.meetingTitle}>{v.title}</Text>
                <Text style={styles.subTxt}>
                  {'(Pre Arrange Meeting Area)'}
                </Text>
              </View>
              <Text>
                {v.start_time} | {v.end_time}
              </Text>
            </View>
          )
        })}
      </View>
    </Card>
  )
}
export default NetworkingCard

const styles = StyleSheet.create({
  card: {
    minHeight: 200,
    borderColor: colors.inputBorder,
    borderWidth: 0.5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  header: {
    height: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  timeView: {
    backgroundColor: '#fff',
    padding: 2,
    paddingHorizontal: 7,
    borderRadius: 125,
  },
  icon: {height: 100, width: 100},
  title: {color: '#fff', fontFamily: 'Montserrat-Bold', flex: 3},
  box: {flex: 1, padding: 8},
  exhibition: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
    color: '#fff',
  },
  meetingView: {
    height: 40,
    width: '100%',
    marginVertical: 6,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingTitle: {
    color: colors.themeBlack,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  subTxt: {
    color: colors.themeBlack,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
})
