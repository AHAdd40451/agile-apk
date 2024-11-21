import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  Touchable,
  Image,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native'
import styles from './index.style'

import {Text} from '../../components'
import {useLazyGetEventsQuery} from '../../services/events'
import getUserInfo from '../../helpers/getUserInfo'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'
import {addKeyToStorage} from '../../helpers/asyncStorage'
import {Context as AuthContext} from '../../context/AuthContext'
import Header from '../../components/Header'
import images from '../../assets/images'

import {colors} from '../../theme'
import Notification from '../../Notification'
import dayjs from 'dayjs'

const Event = ({route}) => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [
    getUpcomingEvent,
    {data: events, isLoading: eventLoading},
  ] = useLazyGetEventsQuery()

  const [
    getOnGoingEvent,
    {data: onGoing, isLoading: eventOnGoingLoading},
  ] = useLazyGetEventsQuery()
  const [day, setDay] = useState('Day 1')
  const [hall, setHall] = useState('Hall A')
  const [event, setEvent] = useState({})
  const [seeAllDescription, setSeeAllDescription] = useState(false)

  const {addEvent} = useContext(AuthContext)

  const {state} = useContext(AuthContext)
  const user = state?.user

  useEffect(() => {
    getEvent()
  }, [isFocused])
  useEffect(() => {
    if (event) {
      scheduleNetworkingSession()
    }
  }, [event])

  const getEvent = async () => {
    const userInfo = await getUserInfo()
    const getAttendeeId = {
      attendeeId: await userInfo.id,
      currentPage: 1,
      resultPerPage: 1,
      upcoming: true,
    }
    const event = await getUpcomingEvent(getAttendeeId)
    if (event?.data?.events?.data.length) {
      setEvent(event?.data?.events?.data[0])
      await addKeyToStorage('eventID', event?.data?.events?.data[0]._id)
      subscribeToTopic(event?.data?.events?.data[0]._id)
      addEvent(event?.data?.events?.data[0])
    } else {
      delete getAttendeeId.upcoming
      const onGoingEvent = await getOnGoingEvent({
        ...getAttendeeId,
        ongoing: true,
      })
      setEvent(onGoingEvent?.data?.events?.data[0])
      await addKeyToStorage('eventID', onGoingEvent?.data?.events?.data[0]._id)
      addEvent(onGoingEvent?.data?.events?.data[0])
    }
  }

  const subscribeToTopic = eventId => {
    messaging()
      .subscribeToTopic(eventId)
      .then(() => console.log('Subscribed to event' + eventId))
  }

  const scheduleNetworkingSession = () => {
    if (event) {
      let networkingSession = event?.schedules?.filter(
        data => data.type === 'networking',
      )
      if (networkingSession?.length) {
        networkingSession.map(data => {
          var time = data?.start_time
          var hours = Number(time.match(/^(\d+)/)[1])
          var minutes = Number(time.match(/:(\d+)/)[1])
          var AMPM = time.match(/\s(.*)$/)[1]
          if (AMPM == 'PM' && hours < 12) hours = hours + 12
          if (AMPM == 'AM' && hours == 12) hours = hours - 12
          var sHours = hours.toString()
          var sMinutes = minutes.toString()
          if (hours < 10) sHours = '0' + sHours
          if (minutes < 10) sMinutes = '0' + sMinutes
          const fifteenMinutes = 1000 * 15 * 60
          const title = 'Networking Session'
          const body = 'Networking Session will start in 15 mins.'
          const eventDate = dayjs(
            data.day.trim() === 'Day 1' ? event.start_date : event.end_date,
          )
          const triggerBefore = {
            reminder: 'Networking Session' + data.day + 'before',
            date:
              new Date(
                new Date(eventDate).setHours(sHours, sMinutes),
              ).getTime() - fifteenMinutes,
            title,
            body,
          }
          const triggerOnTime = {
            reminder: 'Networking Session' + data.day,
            date: new Date(
              new Date(eventDate).setHours(sHours, sMinutes),
            ).getTime(),
            title,
            body:
              'Networking Session Time Started.Please be prepare for meetings.',
          }
          if (dayjs().isBefore(triggerBefore.date)) {
            Notification.scheduleNotification(triggerBefore).then(() => {
              console.log('Abcd')
            })
          }
          if (dayjs().isBefore(triggerOnTime.date)) {
            Notification.scheduleNotification(triggerOnTime).then(() => {
              console.log('Abcd')
            })
          }
        })
      }
    }
  }

  const handleClickChat = async () => {
    navigation.navigate('ChatStack')
    // const date = new Date(Date.now())
    // date.setMinutes(3)
  }

  if (eventLoading || eventOnGoingLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.primary} size={'large'} />
      </View>
    )
  }

  const PressableRow = ({title, onPress}) => {
    return (
      <Pressable onPress={onPress} style={styles.rowContainer}>
        <Text style={styles.subHeading}>{title}</Text>
        <Image style={styles.img} source={images.goRight} />
      </Pressable>
    )
  }

  console.log('user.notifications-->', user?.notifications)

  return (
    <ScrollView style={styles.mainView}>
      <Header
        heading={'Event'}
        rightView={
          <TouchableOpacity
            onPress={handleClickChat}
            style={styles.rightView}
            activeOpacity={1.0}
          >
            <Image
              style={{height: 30, tintColor: colors.themeBlack, width: 30}}
              source={images.chat}
            />
            {user?.notifications?.length ? (
              <View style={styles.bedge}>
                <Text style={{color: '#fff'}}>{user?.notifications?.length}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        }
      />
      {!event ? (
        <View
          style={{height: 400, justifyContent: 'center', alignItems: 'center'}}
        >
          <Text>No Upcoming Event</Text>
        </View>
      ) : null}

      {event ? (
        <>
          <Image
            source={{uri: event?.banner}}
            resizeMode='stretch'
            style={styles.banner}
          />
          <View style={{flex: 1, paddingHorizontal: 12}}>
            <Text style={styles.heading}>{event?.name}</Text>

            <PressableRow
              title={'Event Agenda'}
              onPress={() => navigation.navigate('EventAgenda')}
            />
            <PressableRow
              title={'Attendees'}
              onPress={() => navigation.navigate('Attendee')}
            />
            <PressableRow
              title={'Meetings'}
              onPress={() => navigation.navigate('Meeting')}
            />
            <PressableRow
              title={'Personal Agenda'}
              onPress={() => navigation.navigate('Personal')}
            />
            <PressableRow
              title={'Event Booklet'}
              onPress={() => navigation.navigate('EventBooklet')}
            />

            <View style={styles.row}>
              <View style={styles.sub}>
                <Text style={styles.subHeading}>Start Date</Text>
                <Text style={styles.subHeadingDesc}>
                  {new Date(event?.start_date).toDateString()}
                </Text>
              </View>
              <View style={styles.sub}>
                <Text style={styles.subHeading}>End Date</Text>
                <Text style={styles.subHeadingDesc}>
                  {new Date(event?.end_date).toDateString()}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.sub}>
                <Text style={styles.subHeading}>Panel Discussions</Text>
                <Text style={styles.subHeadingDesc}>{event?.discussion}</Text>
              </View>
              <View style={styles.sub}>
                <Text style={styles.subHeading}>Speakers</Text>
                <Text style={styles.subHeadingDesc}>{event?.speakers}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.sub}>
                <Text style={styles.subHeading}>Meetings</Text>
                <Text style={styles.subHeadingDesc}>{event?.meetings}</Text>
              </View>
              <View style={styles.sub}>
                <Text style={styles.subHeading}>Networking Hours</Text>
                <Text style={styles.subHeadingDesc}>
                  {event?.networking_hours}
                </Text>
              </View>
            </View>
            <View style={[styles.sub, {marginTop: 15}]}>
              <Text style={styles.subHeading}>Location</Text>
              <Text style={styles.subHeadingDesc}>{event?.location}</Text>
            </View>

            <Pressable
              onPress={() => {
                setSeeAllDescription(!seeAllDescription)
              }}
              style={[styles.sub, {marginTop: 15}]}
            >
              <Text style={styles.subHeading}>Description</Text>
              <Text style={[styles.subHeadingDesc, {marginBottom: 20}]}>
                {event?.description}
              </Text>
            </Pressable>
          </View>
        </>
      ) : null}
    </ScrollView>
  )
}
export default Event
