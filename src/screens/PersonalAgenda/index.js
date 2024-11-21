import React, {useContext, useEffect, useState} from 'react'
import {FlatList, Text as T, TouchableOpacity, View} from 'react-native'
import styles from './index.style'
import {Context as AuthContext} from '../../context/AuthContext'
import {Button, Text} from '../../components'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {useGetInvitationQuery} from '../../services/invitation'
import Card from '../Home/components/Card'
import Avatar from '../../components/Avatar'
import {colors} from '../../theme'
import {useLazyGetAgendaQuery} from '../../services/agenda'
import {useAddChatMutation} from '../../services/chat'
import BreakCard from '../Home/components/BreakCard'
import KeynoteCard from '../Home/components/KeynoteCard'
import SponsorPresentationCard from '../Home/components/SponsorPresentationCard'
import NetworkingCard from '../Home/components/NetworkingCard'
import PanelDiscussionCard from '../Home/components/PanelDiscussionCard'
import Header from '../../components/Header'
import notification from '../../helpers/notification'
import Notification from '../../Notification'
import dayjs, {Dayjs} from 'dayjs'

const PersonalAgenda = ({route}) => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {state} = useContext(AuthContext)
  const event = state?.event
  const schedules = event.schedules
  const user = state?.user
  const [day, setDay] = useState('Day 1')
  const [getAgenda, {isLoading}] = useLazyGetAgendaQuery()
  const [agenda, setAgenda] = useState([])
  const [personalSchedules, setPersonalSchedules] = useState([])

  const handleOnPressBtn = (type, value) => {
    setDay(value)
  }

  const getUserAgenda = async () => {
    const response = await getAgenda({
      event_id: event._id,
      user_id: user._id,
    })

    const arr = response?.data?.agendas.data || []
    setAgenda(arr.map(v => ({...v.schedule, agenda_id: v._id})))
  }

  useEffect(() => {
    getUserAgenda()
  }, [day])

  const triggerNotificationForEach = async data => {
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
    const title =
      data?.title || data?.short_title || 'Event Will start in 15 mins'
    const eventDate = dayjs(day === 'Day 1' ? data?.start_date : data?.end_date)
    const eventTimeBefor15Mins = new Date(
      new Date(new Date(eventDate).setHours(hours, sMinutes)).getTime() -
        fifteenMinutes,
    )

    console.log(
      'isBefore-->',
      dayjs(),
      dayjs(eventTimeBefor15Mins),
      dayjs().isBefore(eventTimeBefor15Mins),
    )
    if (dayjs().isBefore(eventTimeBefor15Mins)) {
      Notification.scheduleNotification({
        title,
        body: 'It will start in 15 mins',
        date: eventTimeBefor15Mins,
      })
    }
  }

  useEffect(() => {
    updateUserPersonalAgende()
  }, [schedules, agenda , day])

  const updateUserPersonalAgende = async () => {
    await notification.deleteAllScheduledNotifications()
    let personalSchedule = []
    const data = schedules.filter(data => data.day === day)
    const sortedAgenda = agenda.filter(data => data.day === day)
    for (var i = 0; i < data?.length; i++) {
      if (data[i].day === day) {
        let isStartTimeThere = personalSchedule.findIndex(
          item => item.start_time === data[i].start_time,
        )
        if (isStartTimeThere === -1) {
          let inAgenda = sortedAgenda.find(
            item =>
              item.type === data[i].type &&
              item.start_time === data[i].start_time,
          )

          if (!inAgenda) {
            if (
              data[i].type == 'coffe-break' ||
              data[i].type == 'lunch-break' ||
              data[i].type == 'cocktail-break' ||
              data[i].type == 'breakfast' ||
              data[i].type == 'registration' ||
              data[i].type == 'networking'
            ) {
              personalSchedule.push({...data[i]})
              // triggerNotificationForEach(data[i])
            }
          } else {
            personalSchedule.push({...inAgenda})
            // triggerNotificationForEach(inAgenda)
          }
        }
      }
    }
    setPersonalSchedules(personalSchedule)
  }

  const renderAgenda = ({item, index}) => {
    return (
      <View key={index}>
        {item.type == 'coffe-break' ||
        item.type == 'lunch-break' ||
        item.type == 'cocktail-break' ||
        item.type == 'breakfast' ||
        item.type == 'registration' ? (
          <BreakCard item={item} />
        ) : item.type == 'keynote' ? (
          <KeynoteCard item={item} />
        ) : item.type == 'sponsor-presentation' ? (
          <SponsorPresentationCard item={item} />
        ) : item.type == 'networking' ? (
          <NetworkingCard item={item} />
        ) : item.type === 'panel-discussion' ? (
          <PanelDiscussionCard item={item} />
        ) : (
          <Text text={item.type} />
        )}
      </View>
    )
  }

  return (
    <View style={styles.mainView}>
      <Header back heading={'Personal Agenda'} />
      <FlatList
        ListHeaderComponent={
          <View style={styles.filterBtnView}>
            <TouchableOpacity
              onPress={() => handleOnPressBtn('day', 'Day 1')}
              activeOpacity={1.0}
              style={[styles.filterBtn, day === 'Day 1' && styles.chosenBg]}
            >
              <Text style={[day === 'Day 1' && styles.chosenTxt]}>Day 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOnPressBtn('day', 'Day 2')}
              activeOpacity={1.0}
              style={[styles.filterBtn, day === 'Day 2' && styles.chosenBg]}
            >
              <Text style={[day === 'Day 2' && styles.chosenTxt]}>Day 2</Text>
            </TouchableOpacity>
          </View>
        }
        data={personalSchedules}
        keyExtractor={item => item._id}
        renderItem={renderAgenda}
      />
    </View>
  )
}
export default PersonalAgenda
