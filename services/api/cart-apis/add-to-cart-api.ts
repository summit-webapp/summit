import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import APP_CONFIG from '../../../interfaces/app-config-interface';

export const PostAddToCartAPI: any = async (appConfig: APP_CONFIG, apiBody: any, token?: any) => {
  let response: any;
  let version = appConfig.version;
  const method = 'put_products';
  const entity = 'cart';
  const apiSDKName = appConfig.app_name;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  let body = {
    version: version,
    method: method,
    entity: entity,
    ...apiBody,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}${apiSDKName}`, body, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      response = res.data.message;
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

export const PostQuickOrderAddToCart = async (appConfig: APP_CONFIG, item_data: any) => {
  let response: any;
  let version = appConfig.version;
  const method = 'put_products';
  const entity = 'cart';
  const apiSDKName = appConfig.app_name;

  const config = {
    headers: {
      Authorization: item_data.token,
    },
  };

  let body = {
    version: version,
    method: method,
    entity: entity,
    item_list: item_data,
  };

  await axios
    .post(`${CONSTANTS.API_BASE_URL}/${apiSDKName}`, body, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      response = res.data.message;
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
