import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL, getHeaders} from '../constants'

export const FeedBackApi = createApi({
  reducerPath: 'feedback',
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
    addFeedback: builder.mutation({
      query: body => ({
        url: 'feedback',
        method: 'POST',
        body,
      }),
    }),
    getFeedback: builder.query({
      query: ({currentPage = 1, resultPerPage = 10000, eventId = ''}) => ({
        url: 'feedback',
        method: 'GET',
        params: {
          current_page: currentPage,
          result_per_page: resultPerPage,
          event_id: eventId,
        },
      }),
    }),
  }),
})

export const {useAddFeedbackMutation, useGetFeedbackQuery} = FeedBackApi
