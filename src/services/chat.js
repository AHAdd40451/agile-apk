import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL, getHeaders} from '../constants'

export const ChatApi = createApi({
  reducerPath: 'chat',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async headers => {
      const headersObj = await getHeaders()
      headers.set('Content-type', 'application/json')
      headers.set('Authorization', headersObj.authorization)
      headers.set('platform', headersObj.platform)
      return headers
    },
  }),
  endpoints: builder => ({
    getChat: builder.query({
      query: ({user = '', event = ''}) => ({
        url: 'chat',
        method: 'GET',
        params: {
          user,
          event,
          result_per_page: 100,
        },
      }),
    }),
    addChat: builder.mutation({
      query: body => ({
        url: `api/chat`,
        method: 'POST',
        body: body,
      }),
    }),
    deleteChat: builder.mutation({
      query: id => ({
        url: `api/chat/${id}`,
        method: 'DELETE',
      }),
    }),
    getMessage: builder.query({
      query: ({result_per_page = 10000, sender = '', receiver = ''}) => ({
        url: 'message',
        method: 'GET',
        params: {
          result_per_page,
          sender,
          receiver,
        },
      }),
    }),
    addMessage: builder.mutation({
      query: body => ({
        url: `message`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
})

export const {
  useGetChatQuery,
  useAddChatMutation,
  useDeleteChatMutation,
  useGetMessageQuery,
  useAddMessageMutation,
} = ChatApi
