import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import { client } from '../general_apis/cookie-instance-api';

export const fetchPincodeApi = async (pincode: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'validate_pincode';
  const entity = 'utils';

  const params = `?version=${version}&method=${method}&entity=${entity}&pincode=${pincode}`;

  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  await axios
    .get(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      console.log('@@product in api', res);
      response = res;
    })
    .catch((err: any) => {
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

const getPincodeApi = (pincode: any) => fetchPincodeApi(pincode);
export default getPincodeApi;
