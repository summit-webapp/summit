import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

export const getMultiCurrencyValue = async () => {
  let response: any;

  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'get_default_currency';
  const entity = 'product';
  const params = `version=${version}&method=${method}&entity=${entity}`;

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}?${params}`;

  await axios
    .get(`${url}`, { timeout: 5000 })
    .then((res: any) => {

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
