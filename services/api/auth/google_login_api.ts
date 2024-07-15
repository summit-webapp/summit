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
  console.log('google@', request?.values);
  console.log('google@', request?.values?.email);
  let response: any;
  let raw_data: IRaw_Data;
  const version = CONSTANTS.VERSION;
  const method = 'signin';
  const entity = 'signin';
  const params = `?version=${version}&method=${method}&entity=${entity}&usr=${request.values.email}&via_google=${request.isGoogleLogin}`;
  console.log('otp req', request);

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
    .post(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`, undefined, { ...config, timeout: 5000 })
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
        console.log('req time out');
        response = 'Request timed out';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        console.log('bad request');
        response = 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        console.log('invalid url');
        response = 'Invalid URL';
      } else {
        console.log('navbar api res err', err);
        response = err;
      }
    });
  return response;
};

const getGoogleLoginApi = (request: any) => GoogleLoginFetch(request);

export default getGoogleLoginApi;
