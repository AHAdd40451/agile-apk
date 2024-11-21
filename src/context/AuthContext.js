import createDataContext from './createDataContext'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {signIn: false, event: {}, user: {}, loading: false}
    case 'signin':
      return {signIn: true, event: {}, user: action.payload, loading: false}
    case 'updateUser':
      return {signIn: true, event: {}, user: action.payload, loading: false}
    case 'event':
      return {
        ...state,
        event: action.payload,
      }
    case 'splash':
      return {signIn: false, user: {}, event: {}, loading: false}

    default:
      return state
  }
}

const signin = dispatch => {
  return obj => {
    dispatch({
      type: 'signin',
      payload: obj,
    })
  }
}

const addEvent = dispatch => {
  return obj => {
    dispatch({
      type: 'event',
      payload: obj,
    })
  }
}

const splash = dispatch => {
  return () => {
    dispatch({
      type: 'splash',
    })
  }
}

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'})
  }
}

const updateUser = dispatch => {
  return obj => {
    dispatch({type: 'updateUser', payload: obj})
  }
}

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, updateUser, addEvent, splash},
  {signIn: false, loading: true, event: {}, user: {}},
)
