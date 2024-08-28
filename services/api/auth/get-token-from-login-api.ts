import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import { TypeLoginAPIParams } from '../../../interfaces/login-params-interface';
import CheckGuestLogin from './guest-login-api';
import UserRoleGet from './get_userrole_api';
import OtpLoginApi from './otp-login-api';
import getGoogleLoginApi from './google_login_api';
import APP_CONFIG from '../../../interfaces/app-config-interface';

const getTokenFromLoginAPI: any = async (appConfig: APP_CONFIG, loginParams: TypeLoginAPIParams) => {
  if (loginParams?.isGuest) {
    const guestLoginFunction = await CheckGuestLogin(appConfig, loginParams);
    return guestLoginFunction;
  } else if (loginParams?.loginViaOTP) {
    const getTokenAfterLoggingViaOTP: any = await OtpLoginApi(appConfig, loginParams);
    return getTokenAfterLoggingViaOTP;
  } else if (loginParams?.LoginViaGoogle) {
    const getTokenAfterLogginViaGoogle = await getGoogleLoginApi(appConfig, loginParams);
    return getTokenAfterLogginViaGoogle;
  } else {
    const getTokenAfterLogginViaUsrAndPwd = await getAccessTokenFromAPI(appConfig, loginParams);
    return getTokenAfterLogginViaUsrAndPwd;
  }
};

const getAccessTokenFromAPI = async (appConfig: APP_CONFIG, loginParams: TypeLoginAPIParams) => {
  const usr = loginParams?.values.usr;
  const pwd = encodeURIComponent(loginParams?.values?.pwd);
  const version = appConfig.version;
  const method = 'get_access_token';
  const entity = 'access_token';
  const apiSDKName = appConfig.app_name;

  let response: any;

  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  const params = `?version=${version}&method=${method}&entity=${entity}&usr=${usr}&pwd=${pwd}`;
  await axios.post(`${CONSTANTS.API_BASE_URL}${apiSDKName}${params}`, undefined, config).then((res) => {
    response = res?.data?.message;
    UserRoleGet(appConfig, res?.data?.message?.data?.access_token);
  });
  return response;
};

export default getTokenFromLoginAPI;
