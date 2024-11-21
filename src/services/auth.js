import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../constants'
// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    login: builder.mutation({
      query: user => ({
        headers: {
          'Content-type': 'application/json',
          'device': 'mobile',
        },
        url: 'user/login',
        method: 'POST',
        body: user,
      }),
    }),
    getUser: builder.query({
      query: ({token, userId}) => ({
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        url: `user?user_id=${userId}`,
        method: 'GET',
      }),
    }),
    forgotPassword: builder.mutation({
      query: body => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: 'authentication/forgotpassword',
        method: 'POST',
        body: body,
      }),
    }),
    deleteAccount: builder.mutation({
      query: ({studentId, token}) => ({
        headers: {
          'Content-type': 'application/json',
          authorization: token,
        },
        url: `delete-account?studentId=${studentId}`,
        method: 'DELETE',
      }),
    }),

    updatePassword: builder.mutation({
      query: ({token, body}) => ({
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        url: `auth/update_password`,
        method: 'POST',
        body,
      }),
    }),

    updateUser: builder.mutation({
      query: ({token, body}) => ({
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        url: `auth/updateUser`,
        method: 'PUT',
        body,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useUpdatePasswordMutation,
  useLazyGetUserQuery,
  useUpdateUserMutation,
} = authApi
