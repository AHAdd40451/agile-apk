import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL, getHeaders} from '../constants'

export const eventsApi = createApi({
  reducerPath: 'events',
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
    getEvents: builder.query({
      query: ({
        currentPage = 1,
        resultPerPage = 10000,
        ongoing = '',
        upcoming = '',
        past = '',
        attendeeId = '',
      }) => ({
        url: `event`,
        method: 'GET',
        params: {
          current_page: currentPage,
          result_per_page: resultPerPage,
          ongoing: ongoing,
          upcoming: upcoming,
          past: past,
          attendee_id: attendeeId,
        },
      }),
    }),
    addEvent: builder.mutation({
      query: body => {
        return {
          url: `event`,
          method: 'POST',
          body: body,
        }
      },
    }),

    addInterestNotInterest: builder.mutation({
      query: body => {
        return {
          url: `event/interestNotInterest`,
          method: 'POST',
          body: body,
        }
      },
    }),
  }),
})

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useLazyGetEventsQuery,
  useAddInterestNotInterestMutation,
} = eventsApi
