import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import { callPostAPI } from '../../../utils/utils';

<<<<<<< HEAD:services/api/cart-page-api/add-to-cart-api.ts
const AddToCartPostApi: any = async (params:any, token?: any) => {
  let version = CONSTANTS.VERSION;
=======
export const PostAddToCartAPI: any = async (apiBody: any, token?: any) => {
  console.log('add currency in api', token);
  let response: any;
  let version = CONSTANTS.CUSTOM_API_SDK_VERSION;
>>>>>>> 9914735fe90ff98e90b07f6c4075ffe4ca9de7e3:services/api/cart-apis/add-to-cart-api.ts
  const method = 'put_products';
  const entity = 'cart';
  const apiSDKName = CONSTANTS.CUSTOM_API_SDK;

  const body = {
    version: version,
    method: method,
    entity: entity,
<<<<<<< HEAD:services/api/cart-page-api/add-to-cart-api.ts
    item_code: params?.item_code,
    party_name: params?.party_name,
    purity: params?.purity,
    cust_name: params?.cust_name,
    colour: params?.colour,
    wastage: params?.wastage,
    qty_size_list: params?.qty_size_list,
    remark: params?.remark,
    user: params?.user,
  };

  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`;

  const response = await callPostAPI(url, body, token);
=======
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
>>>>>>> 9914735fe90ff98e90b07f6c4075ffe4ca9de7e3:services/api/cart-apis/add-to-cart-api.ts
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
<<<<<<< HEAD:services/api/cart-page-api/add-to-cart-api.ts

const AddToCartApi = (params:any, token?: any) => AddToCartPostApi(params,token);

export default AddToCartApi;
=======
>>>>>>> 9914735fe90ff98e90b07f6c4075ffe4ca9de7e3:services/api/cart-apis/add-to-cart-api.ts
