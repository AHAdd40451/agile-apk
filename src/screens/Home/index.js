import React, {useCallback, useContext, useEffect, useState} from 'react'
import {View, FlatList, TouchableOpacity, Touchable, Image} from 'react-native'
import styles from './index.style'

import {Text} from '../../components'
import {useLazyGetEventsQuery} from '../../services/events'
import getUserInfo from '../../helpers/getUserInfo'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {useLazyGetSchedulesQuery} from '../../services/agenda'

import BreakCard from './components/BreakCard'
import KeynoteCard from './components/KeynoteCard'
import SponsorPresentationCard from './components/SponsorPresentationCard'
import NetworkingCard from './components/NetworkingCard'
import PanelDiscussionCard from './components/PanelDiscussionCard'
import {addKeyToStorage} from '../../helpers/asyncStorage'
import {Context as AuthContext} from '../../context/AuthContext'
import Header from '../../components/Header'
import images from '../../assets/images'
import Notification from '../../Notification'
import notification from '../../helpers/notification'
import {colors} from '../../theme'

const Home = ({route}) => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [getSchedules, {isLoading}] = useLazyGetSchedulesQuery()

  const [day, setDay] = useState('Day 1')
  const [hall, setHall] = useState('Hall A')
  const [agendas, setAgendas] = useState([])

  const {addEvent, state} = useContext(AuthContext)
  const event = state?.event

  useEffect(() => {
    if (event?._id) {
      getAgendas(event?._id)
    }
  }, [hall, day])

  const getAgendas = async id => {
    let hallA = []
    let hallB = []
    const response = await getSchedules({
      currentPage: 1,
      resultPerPage: 1000,
      eventID: id,
      day,
    })
    const data = response?.data?.schedules?.data || []
    for (var i = 0; i < data?.length; i++) {
      if (data[i].hall === 'Hall A') {
        hallA.push(data[i])
      } else if (data[i].hall === 'Hall B') {
        hallB.push(data[i])
      } else {
        hallA.push(data[i])
        hallB.push(data[i])
      }
    }

    if (hall === 'Hall A') {
      setAgendas([
        ...hallA.sort(
          (a, b) =>
            new Date('1970/01/01 ' + a.start_time) -
            new Date('1970/01/01 ' + b.start_time),
        ),
      ])
    } else {
      setAgendas([
        ...hallB.sort(
          (a, b) =>
            new Date('1970/01/01 ' + a.start_time) -
            new Date('1970/01/01 ' + b.start_time),
        ),
      ])
    }
  }

  const getEvent = async () => {
    const userInfo = await getUserInfo()
    const getAttendeeId = {
      attendeeId: await userInfo.id,
      currentPage: 1,
      resultPerPage: 1,
      upcoming: true,
    }
    const event = await getUpcomingEvent(getAttendeeId)
    setEvent(event?.data?.events?.data[0])
    await addKeyToStorage('eventID', event?.data?.events?.data[0]._id)
    addEvent(event?.data?.events?.data[0])
    getAgendas(event?.data?.events?.data[0]?._id)
  }

  const handleOnPressBtn = (type, value) => {
    if (type === 'day') {
      setDay(value)
    } else {
      setHall(value)
    }
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

  const handleClickChat = async () => {
    navigation.navigate('ChatStack')
  }

  return (
    <View style={styles.mainView}>
      <Header back heading={'Event Agenda'} />

      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>{event?.name}</Text>
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
              <TouchableOpacity
                onPress={() => handleOnPressBtn('hall', 'Hall A')}
                activeOpacity={1.0}
                style={[styles.filterBtn, hall === 'Hall A' && styles.chosenBg]}
              >
                <Text style={[hall === 'Hall A' && styles.chosenTxt]}>
                  Hall A
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOnPressBtn('hall', 'Hall B')}
                activeOpacity={1.0}
                style={[styles.filterBtn, hall === 'Hall B' && styles.chosenBg]}
              >
                <Text style={[hall === 'Hall B' && styles.chosenTxt]}>
                  Hall B
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        data={agendas}
        keyExtractor={item => item._id}
        renderItem={renderAgenda}
      />
    </View>
  )
}
export default Home
