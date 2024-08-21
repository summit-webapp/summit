import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import APP_CONFIG from '../../../interfaces/app-config-interface';

interface IRaw_Data {
  version?: string;
  method?: string;
  entity?: string;
  usr?: string;
  name?: string;
  pwd?: string;
  via_google?: boolean;
  redirect?: boolean;
  guest_token?: any;
}
const CheckGuestLogin = async (appConfig: APP_CONFIG, request: any) => {
  let response: any;
  let raw_data: IRaw_Data;
  const version = appConfig.version;
  const apiSDKName = appConfig.app_name;

  let isVisitor = typeof window !== 'undefined' ? localStorage.getItem('guest') : null;

  const config = {
    headers: {},
  };
  raw_data = {
    version: version,
    method: 'existing_user_signin',
    entity: 'signin',
    usr: request.values.usr,
    pwd: request.values.pwd,
    guest_token: isVisitor,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}${apiSDKName}`, raw_data, { ...config, timeout: 5000 })
    .then((res) => {
      response = res?.data?.data?.access_token;
      if (response?.data?.data?.message === 'Logged In') {
        localStorage.setItem('isLoggedIn', 'true');
      }
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

export default CheckGuestLogin;
