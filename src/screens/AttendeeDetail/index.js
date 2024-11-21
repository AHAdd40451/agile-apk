import React, {useContext, useEffect, useState} from 'react'
import {
  ScrollView,
  TouchableOpacity,
  Text as T,
  View,
  Linking,
  TextInput,
} from 'react-native'
import styles from './index.style'
import {Context as AuthContext} from '../../context/AuthContext'
import {useIsFocused, useNavigation} from '@react-navigation/native'

import {useAddChatMutation} from '../../services/chat'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'
import {Button, Text} from '../../components'
import {colors} from '../../theme'

const AttendeesDetail = ({route}) => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {state} = useContext(AuthContext)
  const event = state?.event
  const user = state?.user
  const attendee = route?.params?.attendee

  const [addChat, {isLoading: chatAddLoading}] = useAddChatMutation()

  const handleAddChat = async receiver => {
    console.log({
      sender: user._id,
      receiver: receiver._id,
      event: event._id,
    })
    try {
      await addChat({
        sender: user._id,
        receiver: receiver._id,
        event: event._id,
      })
      navigation.navigate('ChatStack', {
        screen: 'Messages',
        params: {
          item: {
            sender: user._id,
            receiver: receiver._id,
            event: event._id,
          },
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const Row = ({title, desc, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.row}>
        <Text style={styles.title} text={title} />

        <Text numberOfLines={2} style={[styles.text]} text={desc} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.mainView}>
      <Header
        back
        heading={`${attendee.first_name.trim()} ${attendee.last_name.trim()}`}
      />
      <ScrollView>
        <View style={{marginBottom: 10}}>
          <Avatar style={styles.avatar} img={attendee?.picture} />
          <Text
            style={styles.heading}
            text={`${attendee.first_name.trim()} ${attendee.last_name.trim()}`}
          />

          <Row title={'Email'} desc={attendee.email} />

          <Row
            title={'Phone'}
            desc={
              attendee?.metadata?.delegate_details?.phone ||
              attendee?.metadata?.delegate_details?.mobile ||
              '----'
            }
          />
          <Row title={'Gender'} desc={attendee?.gender || '--'} />

          <Row
            title={'Position'}
            desc={attendee.metadata?.delegate_details?.position || '--'}
          />
          <Row
            title={'Company'}
            onPress={() =>
              attendee.metadata?.delegate_details?.company
                ? Linking.openURL(attendee.metadata?.delegate_details?.company)
                : null
            }
            desc={attendee.metadata?.delegate_details?.company || '--'}
          />
          <Row
            onPress={() =>
              attendee.metadata?.delegate_details?.company
                ? Linking.openURL(attendee.metadata?.delegate_details?.website)
                : null
            }
            title={'Website'}
            desc={attendee.metadata?.delegate_details?.website || '--'}
          />

          <Row
            title={'Linked In'}
            desc={attendee.metadata?.delegate_details?.linkedIn || '--'}
          />

          <Row
            title={'Scope For Responsibility'}
            desc={
              attendee.metadata?.extra_details?.scope_for_resposibility || '--'
            }
          />

          <Row
            title={'Industrial Sector'}
            desc={attendee.metadata?.extra_details?.indutrial_sector || '--'}
          />

          <Row
            title={'Post Code'}
            desc={attendee.metadata?.delegate_details?.post_code || '--'}
          />

          <Row
            title={'Address'}
            desc={attendee.metadata?.delegate_details?.address || '--'}
          />
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Button
            style={[
              styles.chat,
              {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => {
              attendee?.metadata?.delegate_details?.phone ||
              attendee?.metadata?.delegate_details?.mobile
                ? Linking.openURL(
                    `tel:${attendee?.metadata?.delegate_details?.phone ||
                      attendee?.metadata?.delegate_details?.mobile}`,
                  )
                : null
            }}
            title={'Call'}
            titleStyle={{
              color: colors.primary,
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 18,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            onPress={() => {
              handleAddChat(attendee)
            }}
            style={styles.chat}
            title={'Message'}
            titleStyle={{
              color: colors.white,
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 18,
            }}
          />
        </View>
      </View>
    </View>
  )
}
export default AttendeesDetail
