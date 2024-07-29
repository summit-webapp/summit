import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

export const PostAddToCartAPI: any = async (apiBody: any, token?: any) => {
  console.log('add currency in api', token);
  let response: any;
  let version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = 'put_products';
  const entity = 'cart';
  const apiSDKName = CONSTANTS.CUSTOM_API_SDK;

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

export const PostQuickOrderAddToCart = async (item_data: any) => {
  console.log('uick order add cart api', item_data);
  let response: any;
  let version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'put_products';
  const entity = 'cart';
  const apiSDKName = CONSTANTS.CUSTOM_API_SDK;

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
