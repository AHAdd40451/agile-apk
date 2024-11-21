import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL, getHeaders} from '../constants'

export const BookApi = createApi({
  reducerPath: 'book',
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
    getEventBook: builder.query({
      query: ({eventID}) => ({
        url: `book/${eventID}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {useGetEventBookQuery} = BookApi
