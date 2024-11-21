import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from '../../../components'
import {colors} from '../../../theme'
import FastImage from 'react-native-fast-image'
import images from '../../../assets/images'
import Card from './Card'

const BreakCard = ({item}) => {
  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.timeView}>
          <Text style={{fontSize: 12}}>
            {item?.start_time} - {item?.end_time}
          </Text>
        </View>
      </View>
      <View style={styles.box}>
        <FastImage
          source={item.type === 'registration' ? images.file : images.breakfast}
          resizeMode={'contain'}
          style={[styles.icon]}
          tintColor={colors.primary}
        />
      </View>
    </Card>
  )
}
export default BreakCard

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
  box: {flex: 1, justifyContent: 'center', alignItems: 'center'},
})
