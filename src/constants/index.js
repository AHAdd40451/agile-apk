import {getValueFromStorage} from '../helpers/asyncStorage'

export const BASE_URL =
  'https://afsg-api-dot-friendstick.df.r.appspot.com/api/'
export const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/dz0gqxh7e/image/upload'

// export const PUBLIC_URL = 'https://qari.io/';

export const getHeaders = async () => {
  const token = await getValueFromStorage('token')
  const headers = {
    'Content-type': 'application/json',
    authorization: 'Bearer ' + token,
    platform: 'mobile',
  }

  return headers
}

export const imgPickerConfig = {
  // width: 1000,
  // height: 1200,
  // cropping: true,
  includeBase64: false,
  compressImageQuality: 1,
}
