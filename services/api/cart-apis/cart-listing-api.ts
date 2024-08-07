import { CONSTANTS } from '../../config/app-config';
import { callGetAPI } from '../../../utils/utils';
import axios from 'axios';
const fetchCartListingAPI = async (token: any) => {
  const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = 'get_list';
  const entity = 'cart';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  let response: any;
  if (Object?.keys(token)?.length > 0) {
    const url: any = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`;
    response = await callGetAPI(url, token);
    return response;
  } else {
    await axios
      .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`, {
        timeout: 5000,
      })
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
  }
};
export default fetchCartListingAPI;
