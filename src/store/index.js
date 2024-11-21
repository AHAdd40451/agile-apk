import {configureStore} from '@reduxjs/toolkit'
import {authApi} from '../services/auth'
import {setupListeners} from '@reduxjs/toolkit/dist/query'
import {eventsApi} from '../services/events'
import {AgendaApi} from '../services/agenda'
import {InvitationApi} from '../services/invitation'
import {AttendeesApi} from '../services/attendees'
import {ChatApi} from '../services/chat'
import {BookApi} from '../services/book'
import {FeedBackApi} from '../services/feedback'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [AgendaApi.reducerPath]: AgendaApi.reducer,
    [InvitationApi.reducerPath]: InvitationApi.reducer,
    [AttendeesApi.reducerPath]: AttendeesApi.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,
    [BookApi.reducerPath]: BookApi.reducer,
    [FeedBackApi.reducerPath]: FeedBackApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      eventsApi.middleware,
      AgendaApi.middleware,
      InvitationApi.middleware,
      AttendeesApi.middleware,
      ChatApi.middleware,
      BookApi.middleware,
      FeedBackApi.middleware,
    ),
})

setupListeners(store.dispatch)
