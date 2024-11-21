import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from '../../../components'
import {colors} from '../../../theme'
import FastImage from 'react-native-fast-image'
import images from '../../../assets/images'
import Card from './Card'

const PanelDiscussionCard = ({item}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item?.short_title}</Text>
        <View style={styles.timeView}>
          <Text style={{fontSize: 12}}>
            {item?.start_time} - {item?.end_time}
          </Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text text={item?.title} />

        <View style={styles.moderator}>
          <FastImage
            source={{uri: item?.moderator?.picture}}
            style={styles.img}
            defaultSource={require('../../../assets/images/user.png')}
            resizeMode={'contain'}
          />
          <View style={styles.moderatorView}>
            <Text
              style={{fontFamily: 'Montserrat-SemiBold'}}
              text={`${item?.moderator?.first_name.trim()} ${
                item?.moderator?.last_name
              } (Moderator) `}
            />
            <Text
              style={{fontSize: 12}}
              text={`${item?.moderator?.metadata?.delegate_details?.position ||
                '----'}`}
            />
            <Text
              style={{fontSize: 12}}
              text={`${item?.moderator?.metadata?.delegate_details?.company ||
                '----'}`}
            />
          </View>
        </View>

        {item.panellist.map((v, i) => {
          return (
            <View key={i} style={styles.moderator}>
              <FastImage
                source={{uri: v.picture}}
                style={styles.img}
                resizeMode={'contain'}
            defaultSource={require('../../../assets/images/user.png')}

              />
              <View style={styles.moderatorView}>
                <Text
                  style={{fontFamily: 'Montserrat-SemiBold'}}
                  text={`${v.first_name.trim()} ${v.last_name} (Penalist) `}
                />
                <Text
                  style={{fontSize: 12}}
                  text={`${v.metadata?.delegate_details?.position || '----'}`}
                />
                <Text
                  style={{fontSize: 12}}
                  text={`${v.metadata?.delegate_details?.company || '----'}`}
                />
              </View>
            </View>
          )
        })}
      </View>
    </Card>
  )
}
export default PanelDiscussionCard

const styles = StyleSheet.create({
  moderatorView: {paddingLeft: 12},
  moderator: {
    flexDirection: 'row',
    marginVertical: 12,
  },
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
  img: {height: 50, borderRadius: 125, width: 50},
})
