import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import { callPostAPI } from '../../../utils/utils';

const AddToCartPostApi: any = async (params: any, token?: any) => {
  let version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'put_products';
  const entity = 'cart';

  const body = {
    version: version,
    method: method,
    entity: entity,
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
  return response;
};

export const QuickOrderAddToCart = async (item_data: any) => {
  console.log('uick order add cart api', item_data);
  let response: any;
  let version = CONSTANTS.VERSION;
  const method = 'put_products';
  const entity = 'cart';

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
    .post(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}`, body, {
      ...config,
      timeout: 5000,
    })
    .then((res: any) => {
      console.log('uick order add to cart res', res);
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

const AddToCartApi = (params: any, token?: any) => AddToCartPostApi(params, token);

export default AddToCartApi;
