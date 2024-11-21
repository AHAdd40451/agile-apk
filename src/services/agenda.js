import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL, getHeaders} from '../constants'

export const AgendaApi = createApi({
  reducerPath: 'agenda',
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
    getAgenda: builder.query({
      query: ({
        currentPage = 1,
        resultPerPage = 10000,
        event_id = '',
        user_id = '',
        day = '',
      }) => ({
        url: 'agenda',
        method: 'GET',
        params: {
          current_page: currentPage,
          result_per_page: resultPerPage,
          event_id,
          user_id,
          day,
        },
      }),
    }),
    getSchedules: builder.query({
      query: ({
        currentPage = 1,
        resultPerPage = 10000,
        type,
        hall,
        day,
        eventID,
      }) => ({
        url: 'schedule',
        method: 'GET',
        params: {
          current_page: currentPage || 1,
          result_per_page: resultPerPage || 10,
          type: type || '',
          hall: hall || '',
          day: day || '',
          event_id: eventID || '',
        },
      }),
    }),
  }),
})

export const {
  useLazyGetAgendaQuery,
  useGetAgendaQuery,
  useLazyGetSchedulesQuery,
} = AgendaApi
