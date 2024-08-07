import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';
const fetchCartListingAPI = async (token: any) => {
  const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = 'get_list';
  const entity = 'cart';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url: any = `${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`;
  const response = await callGetAPI(url, token);
  return response;
};
export default fetchCartListingAPI;
