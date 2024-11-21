import React, {useCallback, useContext, useEffect, useState} from 'react'
import {SafeAreaView, Text as T, View} from 'react-native'
import {Context as AuthContext} from '../../context/AuthContext'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {useAddMessageMutation, useGetMessageQuery} from '../../services/chat'
import {GiftedChat} from 'react-native-gifted-chat'
import Header from '../../components/Header'
import socket from '../../utils/socket'

const Messages = ({route}) => {
  const {sender, receiver, receiverDetail} = route?.params?.item
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {state} = useContext(AuthContext)
  const event = state?.event
  const user = state?.user
  const [messageLimit, setMessageLimit] = useState(10)

  const [chatMessages, setChatMessages] = useState([])
  const [details, setDetail] = useState({})

  const {
    data: messages,
    error: messagesError,
    isLoading: messagesLoading,
    refetch: refetchMessages,
  } = useGetMessageQuery({
    result_per_page: 100,
    sender: sender,
    receiver: receiver,
  })

  const [addMessage, {isLoading: messageAddLoading}] = useAddMessageMutation()

  useEffect(() => {
    socket.on('connect', () => {})
  }, [])

  useEffect(() => {
    const chatId =
      receiver < sender ? `${receiver}${sender}` : `${sender}${receiver}`
    if (receiver) {
      socket.on(chatId, data => {
        const oldMessages = [...chatMessages]
        const index = oldMessages.findIndex(v => v._id === data._id)
        if (index === -1) {
          const chat = data
          const obj = {
            ...chat,
            _id: chat._id,
            text: chat.message,
            createdAt: chat.created_at,
            user:
              chat?.sender === user._id
                ? {
                    ...user,
                    name: user.first_name + ' ' + user.last_name,
                    avatar: user.picture,
                    _id: user._id,
                  }
                : {
                    ...receiverDetail,
                    name:
                      receiverDetail.first_name +
                      ' ' +
                      receiverDetail.last_name,
                    avatar: receiverDetail.picture,
                    _id: receiverDetail._id,
                  },
          }
          oldMessages.unshift(obj)
          setChatMessages([...oldMessages])
        }
      })
    }
  }, [])

  useEffect(() => {
    const messagesList = messages?.messages?.data || []
    const updatedMsgs = messagesList.map(chat => {
      return {
        ...chat,
        text: chat.message,
        createdAt: chat.created_at,
        user:
          chat?.sender?._id === user._id
            ? {
                ...chat.sender,
                name: chat.sender.first_name + ' ' + chat.sender.last_name,
                avatar: chat.sender.picture,
                _id: chat.sender._id,
              }
            : {
                ...chat.sender,
                name: chat.sender.first_name + ' ' + chat.sender.last_name,
                avatar: chat.sender.picture,
                _id: chat.sender._id,
              },
      }
    })
    setChatMessages([...updatedMsgs])
  }, [messagesLoading, messages, messages?.messages?.data])

  const onSend = useCallback(async (chatMessages = []) => {
    setChatMessages(previousMessages =>
      GiftedChat.append(previousMessages, chatMessages),
    )
    const data = {
      message: chatMessages[0].text,
      sender: sender,
      receiver: receiver,
    }
    const addedMessage = await addMessage(data)
    const socketData = {
      ...addedMessage.data.message,
      receiver: receiver,
      sender: sender,
    }

    socket.emit('message', socketData)
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header back heading={'Chat'} />

      <GiftedChat
        messages={chatMessages}
        onSend={messages => onSend(messages)}
        user={{
          _id: sender,
        }}
        showUserAvatar
      />
    </SafeAreaView>
  )
}
export default Messages
