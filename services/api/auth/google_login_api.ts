import axios, { AxiosRequestHeaders } from 'axios';
import { CONSTANTS } from '../../config/app-config';
import UserRoleGet from './get_userrole_api';
interface IRaw_Data {
  version?: string;
  method?: string;
  entity?: string;
  usr?: string;
  email?: string;
  name?: string;
  pwd?: string;
  via_google?: boolean;
  redirect?: boolean;
  with_otp?: boolean;
}

const GoogleLoginFetch = async (request: any) => {
  let response: any;
  let raw_data: IRaw_Data;
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'signin';
  const entity = 'signin';
  const apiSDKName = CONSTANTS.SUMMIT_API_SDK;

  const params = `?version=${version}&method=${method}&entity=${entity}&usr=${request.values.email}&via_google=${request.isGoogleLogin}`;

  const config = {
    headers: {
      Accept: 'application/json',
    },
  };
  raw_data = {
    usr: request.email,
    pwd: request.password,
    via_google: true,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}${apiSDKName}${params}`, undefined, { ...config, timeout: 5000 })
    .then((res) => {
      console.log('google login response api', res);
      response = res?.data?.message;
      if (res?.data?.message?.msg === 'success') {
        localStorage.setItem('isLoggedIn', 'true');
      }
      UserRoleGet(res?.data?.message?.data?.access_token);
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        response = 'Request timed out';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        response = 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        response = 'Invalid URL';
      } else {
        response = err;
      }
    });
  return response;
};

const getGoogleLoginApi = (request: any) => GoogleLoginFetch(request);

export default getGoogleLoginApi;
