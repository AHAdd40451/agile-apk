import jwt_decode from 'jwt-decode'
import {getValueFromStorage} from './asyncStorage'
const getUserInfo = async () => {
  try {
    const token = await getValueFromStorage('token')
    let user = jwt_decode(token)
    return user
  } catch (err) {
    return err
  }
}

export default getUserInfo
