import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from '../../../components'
import {colors} from '../../../theme'
import FastImage from 'react-native-fast-image'
import Card from './Card'
import Avatar from '../../../components/Avatar'

const KeynoteCard = ({item}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {item?.short_title || 'Keynote Presentation'}
        </Text>
        <View style={[styles.timeView, {marginRight : 12}]}>
          <Text style={{fontSize: 12}}>{item?.hall}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={{fontSize: 12}}>
            {item?.start_time} - {item?.end_time}
          </Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={{fontFamily: 'Montserrat-SemiBold'}}>{item?.title}</Text>
        {item?.description
          ? item?.description.map((note, i) => {
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 4,
                  }}
                >
                  <View style={styles.dot} />
                  <Text>{note.trim()}</Text>
                </View>
              )
            })
          : null}

        {item?.speaker ? (
          <View style={styles.speakerContainer}>
            <Avatar style={styles.user} img={item?.speaker?.picture} />

            <View style={styles.speakerInfo}>
              <Text
                style={{fontFamily: 'Montserrat-Bold'}}
                text={`${item?.speaker?.first_name} ${item?.speaker?.last_name}`}
              />
              <Text
                text={
                  item?.speaker?.metadata?.delegate_details.position || '----'
                }
                style={{fontSize: 12}}
              />
              <Text
                text={
                  item?.speaker?.metadata?.delegate_details?.company || '----'
                }
                style={{fontSize: 12}}
              />
            </View>
          </View>
        ) : null}
      </View>
    </Card>
  )
}
export default KeynoteCard

const styles = StyleSheet.create({
  card: {
    minHeight: 200,
    borderColor: colors.inputBorder,
    borderWidth: 0.5,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  header: {
    height: 50,
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
  box: {flex: 1, padding: 12},
  dot: {
    height: 5,
    borderRadius: 125,
    width: 5,
    marginRight: 4,
    backgroundColor: colors.primary,
  },
  user: {height: 50, width: 50, borderRadius: 125},
  speakerInfo: {paddingLeft: 6, flex: 1},
  speakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
})
