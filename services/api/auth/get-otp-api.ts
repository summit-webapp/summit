import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

const sendOTPToUserAPI = async (emailValue: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'send_otp';
  const entity = 'otp';
  const params = `?version=${version}&method=${method}&entity=${entity}&usr=${emailValue.email}`;
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`, undefined, { ...config, timeout: 5000 })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        response = 'Request timed out';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        response = err?.response?.data?.exception ?? 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        response = 'Invalid URL';
      } else {
        response = err;
      }
    });
  return response;
};

export default sendOTPToUserAPI;
