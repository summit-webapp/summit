import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

const logoutUser = async (appName: string | null, token: any) => {
  let response: any;

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/api/method/logout`, undefined, {
      timeout: 5000,
    })
    .then((res) => {
      response = res;
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

export default logoutUser;
