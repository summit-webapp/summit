import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import { TypeLoginAPIParams } from '../../../interfaces/login-params-interface';
import CheckGuestLogin from './guest-login-api';
import UserRoleGet from './get_userrole_api';
import OtpLoginApi from './otp-login-api';
import getGoogleLoginApi from './google_login_api';

const getTokenFromLoginAPI: any = async (loginParams: TypeLoginAPIParams) => {
  if (loginParams.isGuest) {
    const guestLoginFunction = await CheckGuestLogin(loginParams);
    return guestLoginFunction;
  } else if (loginParams.loginViaOTP) {
    const getTokenAfterLoggingViaOTP: any = await OtpLoginApi(loginParams);
    return getTokenAfterLoggingViaOTP;
  } else if (loginParams.LoginViaGoogle) {
    const getTokenAfterLogginViaGoogle = await getGoogleLoginApi(loginParams);
    return getTokenAfterLogginViaGoogle;
  } else {
    const getTokenAfterLogginViaUsrAndPwd = await getAccessTokenFromAPI(loginParams);
    return getTokenAfterLogginViaUsrAndPwd;
  }
};

const getAccessTokenFromAPI = async (loginParams: TypeLoginAPIParams) => {
  const usr = loginParams.values.usr;
  const pwd = encodeURIComponent(loginParams.values.pwd);
  const version = CONSTANTS.VERSION;
  const method = 'get_access_token';
  const entity = 'access_token';
  let response: any;

  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  const params = `?version=${version}&method=${method}&entity=${entity}&usr=${usr}&pwd=${pwd}`;
  await axios.post(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`, undefined, config).then((res) => {
    response = res?.data?.message;
    UserRoleGet(res?.data?.message?.data?.access_token);
  });
  return response;
};

export default getTokenFromLoginAPI;
