import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL, getHeaders} from '../constants'

export const InvitationApi = createApi({
  reducerPath: "invitation",
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
  endpoints: (builder) => ({
    getInvitation: builder.query({
      query: ({
        currentPage = 1,
        resultPerPage = 10000,
        eventId = "",
        sender = "",
        receiver = "",
      }) => ({
        url: "invitation",
        method: "GET",
        params: {
          current_page: currentPage,
          result_per_page: resultPerPage,
          event_id: eventId,
          sender,
          receiver,
        },
      }),
    }),
    addInvitation: builder.mutation({
      query: (body) => ({
        url: `api/invitation`,
        method: "POST",
        body: body,
      }),
    }),
    putInvitation: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `api/invitation/${id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesQueries: [{ queryFn: "getInvitation" }], // Invalidate the getInvitation query
    }),
  }),
});

export const {
  useGetInvitationQuery,
  useLazyGetInvitationQuery,
  useAddInvitationMutation,
  usePutInvitationMutation,
} = InvitationApi;
