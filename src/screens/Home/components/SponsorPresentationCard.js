import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from '../../../components'
import {colors} from '../../../theme'
import FastImage from 'react-native-fast-image'
import images from '../../../assets/images'
import Card from './Card'
import Avatar from '../../../components/Avatar'

const SponsorPresentationCard = ({item}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}> Sponsor Presentation</Text>
        <View style={styles.timeView}>
          <Text style={{fontSize: 12}}>
            {item?.start_time} - {item?.end_time}
          </Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            source={{uri: item.image}}
            style={styles.img}
            defaultSource={require('../../../assets/images/user.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.boxTitle} text={item.title} />
        </View>

        {item?.speaker ? (
          <View style={styles.topPadd}>
            <Avatar style={styles.user} img={item?.speaker?.picture} />
            <View style={{paddingLeft: 6, flex: 1}}>
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
export default SponsorPresentationCard

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
  box: {flex: 1, padding: 12},
  dot: {
    height: 5,
    width: 5,
    backgroundColor: colors.primary,
  },
  user: {height: 50, width: 50, borderRadius: 125},
  topPadd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  boxTitle: {
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
    paddingTop: 4,
    paddingLeft: 12,
  },
  img: {height: 80, width: 80},
})
