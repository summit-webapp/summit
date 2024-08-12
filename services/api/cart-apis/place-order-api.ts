import { callPostAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

const postPlaceOrderAPI: any = async (params: any, token?: any) => {
  let response: any;
  let version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = 'place_order';
  const entity = 'order';
  const apiSDKName = CONSTANTS.CUSTOM_API_SDK;
  const url = `${CONSTANTS.API_BASE_URL}${apiSDKName}?version=${version}&method=${method}&entity=${entity}&order_id=${params?.order_id}&party_name=${params?.party_name}`;

  response = await callPostAPI(url, undefined, token);
  return response;
};
export default postPlaceOrderAPI;
