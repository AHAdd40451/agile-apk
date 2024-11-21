import React, {useContext, useEffect, useState} from 'react'
import {FlatList, Text as T, View} from 'react-native'
import styles from './index.style'
import {Context as AuthContext} from '../../context/AuthContext'
import {Text} from '../../components'
import {useIsFocused} from '@react-navigation/native'
import {useGetInvitationQuery} from '../../services/invitation'
import Card from '../Home/components/Card'
import Avatar from '../../components/Avatar'
import {colors} from '../../theme'
import Header from '../../components/Header'

const Meetings = ({route}) => {
  const isFocused = useIsFocused()
  const {state} = useContext(AuthContext)
  const event = state?.event
  const user = state?.user

  const [meetings, setMeetings] = useState([])

  const {data, isLoading} = useGetInvitationQuery({
    eventId: event._id,
    sender: user._id,
    receiver: user._id,
  })

  function sortTimeArray (timeArray) {
    // Custom comparison function for sorting time strings
    const compareTimes = (time1, time2) => {
      console.log('time1=>', time1)
      console.log('time2=>', time2)
      const [hours1, minutes1, period1] = time1.meeting?.start_time
        .match(/(\d+):(\d+) ([APM]{2})/)
        .slice(1)
      const [hours2, minutes2, period2] = time2.meeting?.start_time
        .match(/(\d+):(\d+) ([APM]{2})/)
        .slice(1)

      const totalMinutes1 =
        Number(hours1) * 60 +
        Number(minutes1) +
        (period1 === 'PM' ? 12 * 60 : 0)
      const totalMinutes2 =
        Number(hours2) * 60 +
        Number(minutes2) +
        (period2 === 'PM' ? 12 * 60 : 0)

      return totalMinutes1 - totalMinutes2
    }

    return timeArray.slice().sort(compareTimes)
  }

  useEffect(() => {
    if (data) {
      const accepted = data?.invitations?.data?.filter(
        data => data.status === 'accepted',
      )

      const acceptedSorted = [
        ...sortTimeArray(accepted.filter(acc => acc.meeting?.day === 'Day 1')),
        ...sortTimeArray(accepted.filter(acc => acc.meeting?.day === 'Day 2')),
      ]
      setMeetings(acceptedSorted)
    }
  }, [isLoading, isFocused])

  const renderMeeting = ({item, index}) => {
    const otherUser =
      item?.receiver?._id === user?._id ? item?.sender : item?.receiver

    return (
      <Card cardStyle={styles.meetingCard}>
        <View style={styles.meeting}>
          <Text style={{fontSize : 15 , color : colors.themeBlack}} text={`Meeting Time`} />
          <View style={styles.meetingView}>
            <Text
              style={{
                fontSize : 14,
                fontFamily : "Montserrat-Medium",
                color: colors.white}}
              text={
                item?.meeting?.start_time
                  ? `${item?.meeting?.start_time} - ${item?.meeting?.end_time} (${item?.meeting?.day})`
                  : '----'
              }
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Avatar img={otherUser?.picture} />
          <View style={{paddingLeft: 8, flex: 1}}>
            <Text
              style={{fontFamily: 'Montserrat-SemiBold'}}
              text={`${otherUser?.first_name} ${otherUser?.last_name}`}
            />
            <Text style={{fontSize: 12}} text={`${otherUser?.email}`} />
          </View>
          {user.user_type === 'delegate' ? (
            <View style={{paddingLeft: 12, alignItems: 'center'}}>
              <Text text={`Table Number`} />
              <View style={styles.tableHeading}>
                <Text
                  style={{color: colors.white}}
                  text={
                    user.user_type === 'delegate' && item?.meeting?.start_time
                      ? item?.receiver?.metadata?.atendee_details?.table_number
                      : `-`
                  }
                />
              </View>
            </View>
          ) : (
            <View style={{paddingLeft: 12, alignItems: 'center'}}>
              <Text text={`Priority`} />
              <View style={styles.tableHeading}>
                <Text style={{color: colors.white}} text={item.priority} />
              </View>
            </View>
          )}
        </View>
      </Card>
    )
  }
  return (
    <View style={styles.mainView}>
      <Header back heading={'Meeting itenerary'} />
      <FlatList
        keyExtractor={item => item._id}
        data={meetings}
        renderItem={renderMeeting}
      />
    </View>
  )
}
export default Meetings
