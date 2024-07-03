import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

export const GetWarrantySerialNoListAPI = async (item_code?: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'get_sr_no_list';
  const entity = 'warranty_claim';

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}`;

  const config = {
    headers: {
      // Authorization: '',
    },
  };

  await axios
    .get(`${url}`, { ...config, timeout: 5000 })
    .then((res: any) => {
      console.log('detail data api response', res);
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
