import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

export const GetContactUsAPI = async () => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'get_contact_us';
  const entity = 'utils';

  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}`;

  const config = {
    headers: {
      // Authorization: '',
    },
  };

  await axios
    .get(`${url}`, { ...config, timeout: 5000 })
    .then((res: any) => {
      // console.log('contact us api response', res);
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
