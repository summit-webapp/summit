import APP_CONFIG from '../../../interfaces/app-config-interface';
import { callPostAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

const postPlaceOrderAPI: any = async (appConfig: APP_CONFIG, params: any, token?: any) => {
  let response: any;
  let version = appConfig.version;
  const method = 'place_order';
  const entity = 'order';
  const apiSDKName = appConfig.app_name;
  const url = `${CONSTANTS.API_BASE_URL}${apiSDKName}?version=${version}&method=${method}&entity=${entity}&order_id=${params?.order_id}&party_name=${params?.party_name}`;

  response = await callPostAPI(url, undefined, token);
  return response;
};
export default postPlaceOrderAPI;
