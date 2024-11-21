import React, {useContext, useEffect, useState} from 'react'
import {FlatList, Text as T, TouchableOpacity, View} from 'react-native'
import styles from './index.style'
import {Context as AuthContext} from '../../context/AuthContext'
import {Text} from '../../components'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import Avatar from '../../components/Avatar'
import {vh} from '../../theme'
import {useGetChatQuery} from '../../services/chat'
import Header from '../../components/Header'

const Chat = ({route}) => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {state} = useContext(AuthContext)
  const event = state?.event
  const user = state?.user

  const [chatMessages, setChatMessages] = useState([])

  const {
    data: chats,
    error,
    isLoading: chatsLoading,
    refetch: refetchChats,
  } = useGetChatQuery({
    user: user._id,
    event: event._id,
  })

  useEffect(() => {
    if (chats?.chats?.data) {
      setChatMessages(chats?.chats?.data)
    }
  }, [chatsLoading, chats?.chats?.data])

  useEffect(() => {
    if (isFocused) {
      console.log('is Focused-->')
      refetchChats()
    }
  }, [isFocused])

  const handleOnClickChat = receiver => {
    navigation.navigate('ChatStack', {
      screen: 'Messages',
      params: {
        item: {
          sender: user._id,
          receiver: receiver._id,
          receiverDetail: receiver,
          event: event._id,
        },
      },
    })
  }

  const renderChats = ({item, index}) => {
    const otherUser =
      item?.receiver?._id === user._id ? item?.sender : item?.receiver
    return (
      <TouchableOpacity
        onPress={() => handleOnClickChat(otherUser)}
        activeOpacity={1.0}
        style={styles.chatContainer}
      >
        <Avatar img={otherUser?.picture} />
        <View style={{flex: 1, paddingLeft: vh}}>
          <Text style={styles.name}>
            {otherUser?.first_name + ' ' + otherUser?.last_name}
          </Text>
          <Text style={styles.lastMsg} numberOfLines={2}>
            {item?.last_message}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.mainView}>
      <Header back heading={'Chat'} />
      <FlatList
        extraData={chatMessages}
        keyExtractor={item => item?._id}
        data={chatMessages}
        renderItem={renderChats}
      />
    </View>
  )
}
export default Chat
