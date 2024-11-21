import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL, getHeaders} from '../constants'

export const AttendeesApi = createApi({
  reducerPath: 'attendees',
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
    getAttendees: builder.query({
      query: ({
        currentPage = 1,
        resultPerPage = 10000,
        eventID,
        userType,
        userID,
      }) => ({
        url: 'attendee',
        method: 'GET',
        params: {
          current_page: currentPage || '',
          result_per_page: resultPerPage || '',
          event_id: eventID || '',
          user_type: userType || '',
          user_id: userID || '',
        },
      }),
    }),
  }),
})

export const {useGetAttendeesQuery, useLazyGetAttendeesQuery} = AttendeesApi
