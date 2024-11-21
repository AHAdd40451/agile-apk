import React, {useContext, useEffect, useState} from 'react'
import {FlatList, Text as T, TextInput, View} from 'react-native'
import styles from './index.style'
import {Context as AuthContext} from '../../context/AuthContext'
import {Button, Text} from '../../components'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import Card from '../Home/components/Card'
import Avatar from '../../components/Avatar'
import {colors} from '../../theme'
import {useGetAttendeesQuery} from '../../services/attendees'
import {useAddChatMutation} from '../../services/chat'
import Header from '../../components/Header'

const Attendees = ({route}) => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {state} = useContext(AuthContext)
  const user = state?.user
  const event = state?.event

  const [addChat, {isLoading: chatAddLoading}] = useAddChatMutation()

  const {data: attendeesData, isLoading, refetch} = useGetAttendeesQuery({
    eventID: event._id,
  })
  const [attendeesArr, setAttendeesArr] = useState([])

  useEffect(() => {
    if (isFocused) {
      refetch()
      if (attendeesData) {
        setAttendeesArr([
          ...attendeesData?.attendees?.data?.filter(data => data?.user),
        ])
      }
    }
  }, [isLoading])

  const renderItem = ({item, index}) => {
    return (
      <Card
        key={index}
        cardStyle={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          minHeight: 80,
          borderColor: colors.inputBorder,
        }}
        onPress={() => {
          navigation.navigate('Attendee', {
            screen: 'AttendeesDetail',
            params: {attendee: item?.user},
          })
        }}
      >
        <Avatar style={styles.avatar} img={item?.user?.picture} />
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            paddingLeft: 12,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: colors.themeBlack,
            }}
            text={`${item?.user?.first_name.trim()} ${item?.user?.last_name.trim()}`}
          />
          <Text style={styles.email} text={item?.user?.email} />
          <Text
            style={styles.text}
            text={item?.user?.metadata?.delegate_details?.position || '----'}
          />
          <Text
            style={styles.text}
            text={item?.user?.metadata?.delegate_details?.company || '----'}
          />
        </View>
      </Card>
    )
  }

  const onChangeText = string => {
    const allData = [
      ...attendeesData?.attendees?.data?.filter(data => data?.user),
    ]
    if (string) {
      const filtered = allData.filter(data => {
        const userName = `${data?.user?.first_name.trim()} ${data?.user?.last_name.trim()}`.toLowerCase()
        return userName.indexOf(string.toLowerCase()) !== -1
      })

      if (filtered) {
        setAttendeesArr([...filtered])
      }
    } else {
      setAttendeesArr([
        ...attendeesData?.attendees?.data?.filter(data => data?.user),
      ])
    }
  }

  return (
    <View style={styles.mainView}>
      <Header back heading={'Attendees'} />
      <View style={styles.searchView}>
        <TextInput
          onChangeText={onChangeText}
          placeholder='Search'
          style={styles.input}
        />
      </View>
      <FlatList
        data={attendeesArr}
        contentContainerStyle={{marginHorizontal: 10}}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
    </View>
  )
}
export default Attendees
