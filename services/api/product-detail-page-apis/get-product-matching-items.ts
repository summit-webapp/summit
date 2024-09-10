import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import APP_CONFIG from '../../../interfaces/app-config-interface';

const fetchProductMatchingItems = async (
  appConfig: APP_CONFIG,
  itemOptions: string[],
  product_id: any,
  currency: any,
  token?: undefined
) => {
  let response: any;
  const version = appConfig.version;
  const method = 'get_recommendation';
  const entity = 'product';

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const getItemOptionsProducts = await Promise.all(
    itemOptions.map(async (option_type: string) => {
      try {
        const res = await axios.get(
          `${CONSTANTS.API_BASE_URL}/${appConfig.app_name}?version=${version}&method=${method}&entity=${entity}&ptype=${option_type}&item=${product_id}&currency=${currency}`,
          { ...config, timeout: 5000 }
        );
        if (res.status === 200 && res.data.message.hasOwnProperty('data')) {
          return { name: option_type, values: res.data.message.data };
        } else {
          return { name: option_type, values: [] };
        }
      } catch (err: any) {
        if (err.code === 'ECONNABORTED') {
          response = 'Request timed out';
        } else if (err.code === 'ERR_BAD_REQUEST') {
          response = 'Bad Request';
        } else if (err.code === 'ERR_INVALID_URL') {
          response = 'Invalid URL';
        } else {
          response = err;
        }
      }
    })
  );

  return getItemOptionsProducts;
};

export default fetchProductMatchingItems;
