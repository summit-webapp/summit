import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import getLoginApi from './login_api';
import CheckGuestLogin from './guest-login-api';

import UserRoleGet from './get_userrole_api';
import OtpLoginApi from './otp-login-api';
import getGoogleLoginApi from './google_login_api';

const getTokenLoginApi: any = async (values: any) => {
  console.log('token req', values);
  const usr = values.values.email;
  const pwd = encodeURIComponent(values.values.password);

  let response: any;
  let guestLoginFunction: any;
  const version = CONSTANTS.VERSION;
  const method = 'get_access_token';
  const entity = 'access_token';
  const params = `?version=${version}&method=${method}&entity=${entity}&usr=${usr}&pwd=${pwd}`;

  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  if (values.guest !== null) {
    guestLoginFunction = await CheckGuestLogin(values);
    console.log('guest login res', guestLoginFunction);
    return guestLoginFunction;
  } else if (values.isOtpLogin === true) {
    const OtpLoginFunction: any = OtpLoginApi(values);
    return OtpLoginFunction;
  } else if (values.isGoogleLogin) {
    const googleLoginFuntion = getGoogleLoginApi(values);
    return googleLoginFuntion;
  } else {
    await axios.post(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`, undefined, config).then((res) => {
      console.log('@@token login', res);
      response = res?.data?.message;
      if (values?.guest !== null) {
        localStorage.setItem('guestToken', response.access_token);
      }
      UserRoleGet(res?.data?.message?.data?.access_token);
    });
    return response;
  }

  // if (values.isOtpLogin === false) {
  //   await axios
  //     .post(
  //       `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
  //       undefined,
  //       config
  //     )
  //     .then((res) => {
  //       console.log("@@token login", res);
  //       response = res?.data?.message;
  //       if (values?.guest !== null) {
  //         localStorage.setItem("guestToken", response.access_token);
  //       }
  //       UserRoleGet(res?.data?.message?.data?.access_token);
  //     })

  //     .then(async () => {
  //       if (values?.guest !== null) {
  //         console.log("token guest values", values);

  //         guestLoginFunction = await CheckGuestLogin(values);
  //         console.log("guest login res", guestLoginFunction)
  //       } else {
  //         console.log("token else");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  //   return { tokenResponse: response, guestLoginFunction: guestLoginFunction };
  // }
  // else {
  //   const OtpLoginFunction: any = OtpLoginApi(values);
  //   return OtpLoginFunction;
  // }
};

export default getTokenLoginApi;
