import { CONSTANTS } from '../../config/app-config';
import { callPostAPI } from '../../../utils/utils';

const postAddToCartApi: any = async ({params, token}:any) => {
  let version = CONSTANTS.VERSION;
  const method = 'put_products';
  const entity = 'cart';

  const url = `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}version=${version}&entity=${entity}&method=${method}&${params}`

  const response = await callPostAPI(url,undefined,token)
  return response
};


export default postAddToCartApi;
